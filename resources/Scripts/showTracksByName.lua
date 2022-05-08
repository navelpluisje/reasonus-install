-- This script is mostly borrowed from Lokasenna_Show only specified tracks.lua

local showTracks = {}

-- Returns true if the individual words of str_b all appear in str_a
-- str a = track name
local function fuzzy_match(str_a, str_b)
    if not (str_a and str_b) then return end
    
    is_match = false
    str_a, str_b = string.lower(tostring(str_a)), string.lower(tostring(str_b))

    -- for every word in search string
    for word in string.gmatch(str_b, "[^%|]+") do
        if string.match(str_a, word) then 
            is_match = true
        end
    end

    return is_match
end

-- str is search string
local function is_match(str, tr_name, tr_idx)
    -- if first char is #
    if str:sub(1, 1) == "#" then
        -- Force an integer until/unless I come up with some sort of multiple track syntax
        str = tonumber(str:sub(2, -1))
        return str and (math.floor( tonumber(str) ) == tr_idx)
    elseif tostring(str) then
        return fuzzy_match(tr_name, tostring(str))
    end
end

-- Select the first visible track
local function select_first_visible_MCP()
    for i = 1, reaper.CountTracks(0) do
        local tr = reaper.GetTrack(0, i - 1)
        if reaper.IsTrackVisible(tr, true) then
            reaper.SetOnlyTrackSelected(tr)
            break
        end
    end
end

local function get_tracks_to_show(settings)
    local matches = {}

    -- Find all matches
    for i = 1, reaper.CountTracks(0) do
        local tr = reaper.GetTrack(0, i - 1)
        local _, name = reaper.GetTrackName(tr, "")
        local idx = math.floor( reaper.GetMediaTrackInfo_Value(tr, "IP_TRACKNUMBER") )
        local ischild = reaper.GetTrackDepth(tr) > 0

        if test.is_match(settings.search, name, idx) and not (ischild and settings.matchonlytop) then
            matches[idx] = true
            if not settings.matchmultiple then break end
        end
    end

    -- Hacky way to check if length of a hash table == 0
    for k in pairs(matches) do
        if not k then return {} end
    end

    local parents = settings.showparents and get_parents(matches)
    local children = settings.showchildren and get_children(matches)
    local siblings = settings.showsiblings and get_siblings(matches)

    return merge_tables(matches, parents, children, siblings)
end

local function merge_tables(...)
    local tables = {...}
    local ret = {}

    for i = #tables, 1, -1 do
        if tables[i] then
            for k, v in pairs(tables[i]) do
                if v then ret[k] = v end
            end
        end
    end
  
    return ret  
end
  
  
  
-- Returns an array of MediaTrack == true for all parents of the given MediaTrack
local function recursive_parents(track)
    if reaper.GetTrackDepth(track) == 0 then
        return {[track] = true}
    else
        local ret = recursive_parents( reaper.GetParentTrack(track) )
        ret[track] = true
        return ret
    end
end
  
  
local function get_children(tracks)  
    local children = {}

    for idx in pairs(tracks) do
        local tr = reaper.GetTrack(0, idx - 1)
        local i = idx + 1

        while i <= reaper.CountTracks(0) do
            children[i] = recursive_parents( reaper.GetTrack(0, i-1) )[tr] == true
            if not children[i] then break end
            i = i + 1
        end
    end
    return children
end
  
  
local function get_parents(tracks)  
    local parents = {}

    for idx in pairs(tracks) do
        local tr = reaper.GetTrack(0, idx - 1)

        for nextParent in pairs( recursive_parents(tr)) do
            parents[ math.floor( reaper.GetMediaTrackInfo_Value(nextParent, "IP_TRACKNUMBER") ) ] = true
        end  
    end
    return parents  
end
    
local function get_top_level_tracks()  
    local top = {}

    for i = 1, reaper.CountTracks() do
        if reaper.GetTrackDepth( reaper.GetTrack(0, i-1) ) == 0 then
            top[i] = true
        end
    end  
    return top
end
  
  
local function get_siblings(tracks)  
    local siblings = {}

    for idx in pairs(tracks) do  
        local tr = reaper.GetTrack(0, idx - 1)
        local sibling_depth = reaper.GetTrackDepth(tr)
  
        if sibling_depth > 0 then
            local parent = reaper.GetParentTrack(tr)
            local children = get_children( {[reaper.GetMediaTrackInfo_Value(parent, "IP_TRACKNUMBER")] = true} )

            for child_idx in pairs(children) do  
                -- Can't use siblings[idx] = ___ here because we don't want to set existing
                -- siblings to false
                if reaper.GetTrackDepth( reaper.GetTrack(0, child_idx-1) ) == sibling_depth then
                    siblings[child_idx] = true
                end  
            end  
        else
            -- Find all top-level tracks
            siblings = merge_tables(siblings, get_top_level_tracks())  
        end  
    end  
    return siblings  
end
  

function set_visibility(tracks, settings)
    if not tracks then return end
    --if not tracks or #tracks == 0 then return end

    reaper.Undo_BeginBlock()
    reaper.PreventUIRefresh(1)  -- Disable refreshing the UI

    for i = 1, reaper.CountTracks(0) do
        local tr = reaper.GetTrack(0, i - 1)

        reaper.SetMediaTrackInfo_Value(tr, "B_SHOWINMIXER", tracks[i] and 1 or 0)
    end

    select_first_visible_MCP()

    reaper.PreventUIRefresh(-1)  -- Enable refreshing again
    reaper.Undo_EndBlock("Show only specified tracks", -1)

    reaper.TrackList_AdjustWindows(false)
    reaper.UpdateArrange()
end

-- Get the tracks which math the criteria.
-- Pass the settings
-- Return a table with the ids to display
function get_tracks_to_show(settings)
    local matches = {}

    -- Find all matches
    for i = 1, reaper.CountTracks(0) do

        local tr = reaper.GetTrack(0, i - 1)
        local _, name = reaper.GetTrackName(tr, "")
        local idx = math.floor( reaper.GetMediaTrackInfo_Value(tr, "IP_TRACKNUMBER") )
        local ischild = reaper.GetTrackDepth(tr) > 0

        if is_match(settings.search, name, idx) and not (ischild and settings.matchonlytop) then
            matches[idx] = true
            if not settings.matchmultiple then break end
        end
    end

    -- Hacky way to check if length of a hash table == 0
    for k in pairs(matches) do
        if not k then return {} end
    end

    local parents = settings.showparents and get_parents(matches)
    local children = settings.showchildren and get_children(matches)
    local siblings = settings.showsiblings and get_siblings(matches)

    return merge_tables(matches, parents, children, siblings)
end

function showTracks.showTracks(settings)
    local tracks = settings and get_tracks_to_show(settings)
    if tracks then
        set_visibility( tracks, settings )
    else
        reaper.MB(
            "Error reading the script's settings. Make sure you haven't edited the script or changed its filename.", "Whoops!", 0)
    end
end

return showTracks