function main()
  isNewValue, file, sec, cmd = reaper.get_action_context()
  state = reaper.GetToggleCommandStateEx(sec, cmd);
  reaper.SetToggleCommandState(sec, cmd, 1)
  reaper.RefreshToolbar2(sec, cmd);
end

main()

