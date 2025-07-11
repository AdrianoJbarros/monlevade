@echo off
echo ========================================
echo    WebGIS - Servidor HTTP Local
echo ========================================
echo.
echo Iniciando servidor HTTP na porta 8000...
echo.
echo Para acessar o WebGIS, abra seu navegador e vá para:
echo http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
echo ========================================

REM Tentar usar Python se disponível
python -m http.server 8000 2>nul
if %errorlevel% neq 0 (
    echo Python nao encontrado, tentando PowerShell...
    powershell -Command "& { $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8000/'); $listener.Start(); Write-Host 'Servidor rodando em http://localhost:8000'; while ($listener.IsListening) { $context = $listener.GetContext(); $request = $context.Request; $response = $context.Response; $localPath = $request.Url.LocalPath; $localPath = $localPath.TrimStart('/'); if ($localPath -eq '') { $localPath = 'index.html' }; $filePath = Join-Path $PWD $localPath; if (Test-Path $filePath) { $content = [System.IO.File]::ReadAllBytes($filePath); $response.ContentLength64 = $content.Length; $response.OutputStream.Write($content, 0, $content.Length) } else { $response.StatusCode = 404 }; $response.Close() } }"
)

pause 