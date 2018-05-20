# Article begins here
- See a function's code
- Interact with functions code
- Build it into a quick function for easy re-use
- My version

## Viewing a Function's Code
You are going to need to pick a function that you want to inspect. If you don't know of one, you can look at a list of them by running:

```powershell
#Let's Grab a command
Get-Command -CommandType Function 

# Once you know the name of a function that you would like you export just run
$Func = Get-Command -name Debug-FileShare

#Let's inspect things a bit further:
$Func | Get-Member  
``` 