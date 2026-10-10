<#
  Copia el encabezado, el bloque de contacto y el pie (tools/plantillas/) a todas las páginas del sitio.
  Es una ayuda para quien edita; el sitio publicado sigue siendo HTML puro, sin build ni dependencias.

  Uso (desde la raíz del proyecto):   powershell -File tools\aplicar-layout.ps1

  Cada página tiene marcas como  <!--LAYOUT:HEADER--> ... <!--/LAYOUT:HEADER-->  (también CONTACTO y FOOTER).
  Lo que hay entre las marcas se reemplaza. Para cambiar el menú o el pie: editar la plantilla y correr el script.
  Para sumar una página nueva: agregarla a la lista $paginas y poner las marcas vacías en su HTML.
#>
$raiz = Split-Path $PSScriptRoot -Parent
$plantillas = Join-Path $PSScriptRoot 'plantillas'
$utf8 = New-Object System.Text.UTF8Encoding($false)

$paginas = @(
  @{ f = 'index.html';            base = './';  activo = 'inicio' },
  @{ f = 'charlas\index.html';    base = '../'; activo = 'charlas' },
  @{ f = 'videos\index.html';     base = '../'; activo = 'videos' },
  @{ f = 'sobre-mi\index.html';   base = '../'; activo = 'sobre-mi' },
  @{ f = 'blog\index.html';       base = '../'; activo = 'blog' }
)
# Todos los artículos del blog (cualquier .html dentro de /blog/ que no sea el índice)
Get-ChildItem (Join-Path $raiz 'blog') -Filter *.html -ErrorAction SilentlyContinue | Where-Object { $_.Name -ne 'index.html' } | ForEach-Object {
  $paginas += @{ f = ('blog\' + $_.Name); base = '../'; activo = 'blog' }
}

$bloques = @{ HEADER = 'header.html'; CONTACTO = 'contacto.html'; FOOTER = 'footer.html' }
foreach ($p in $paginas) {
  $ruta = Join-Path $raiz $p.f
  if (-not (Test-Path $ruta)) { Write-Host "  (no existe) $($p.f)"; continue }
  $texto = [IO.File]::ReadAllText($ruta, $utf8)
  $cambios = 0
  foreach ($b in $bloques.Keys) {
    $tpl = [IO.File]::ReadAllText((Join-Path $plantillas $bloques[$b]), $utf8).Trim()
    $tpl = $tpl.Replace('{{BASE}}', $p.base)
    if ($b -eq 'HEADER' -and $p.activo) { $tpl = $tpl.Replace('data-nav="' + $p.activo + '"', 'data-nav="' + $p.activo + '" aria-current="page"') }
    $patron = "<!--LAYOUT:$b-->.*?<!--/LAYOUT:$b-->"
    $nuevo = "<!--LAYOUT:$b-->`r`n$tpl`r`n<!--/LAYOUT:$b-->"
    if ([regex]::IsMatch($texto, $patron, [System.Text.RegularExpressions.RegexOptions]::Singleline)) {
      $texto = [regex]::Replace($texto, $patron, { param($m) $nuevo }, [System.Text.RegularExpressions.RegexOptions]::Singleline)
      $cambios++
    }
  }
  [IO.File]::WriteAllText($ruta, $texto, $utf8)
  Write-Host ("  {0,-45} {1} bloques" -f $p.f, $cambios)
}
Write-Host 'Listo.'
