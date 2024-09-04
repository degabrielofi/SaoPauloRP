@echo off
Title DeGabrielDEV BOT Menu
goto :menu
color 5


:menu
color 5
echo.  __________________________________________________________
echo.          BOT Menu by DeGabrielDEV                  
echo.                                                           
echo.             1 - Ligar Bot                                                           
echo. __________________________________________________________
echo.
set /p choice=Digite uma opção:
if '%choice%'=='1' goto :iniciarbot
:iniciarbot
cls
echo. ___________________________________________________________

node .

pause .

:sair
exit
