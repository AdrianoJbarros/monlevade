@echo off
echo Iniciando servidor WebGIS...
echo.
echo Se o Node.js nao estiver instalado, voce pode:
echo 1. Instalar Node.js de https://nodejs.org/
echo 2. Ou usar um servidor Python se tiver Python instalado
echo.
echo Tentando iniciar servidor...
echo.

REM Tentar usar Node.js primeiro
npx http-server -p 8000 -o

echo.
echo Se o comando acima falhou, tente:
echo 1. Instalar Node.js: https://nodejs.org/
echo 2. Ou usar Python: python -m http.server 8000
echo.
pause 