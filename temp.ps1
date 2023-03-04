# Path: webp.ps1
Param($Directory)

$files = Get-ChildItem -Path $Directory -Recurse

foreach ($file in $files) {
  # continue if not a file
  if ($file.PSIsContainer) {
    continue
  }
  # continue if not a jpg or png
  if ($file.Extension -notin @(".jpg", ".png")) {
    continue
  }
  $filepath = $file.FullName

  $dir = Split-Path $filepath
  Set-Location $dir

  $filename = $file.Name
  $ext = $file.Extension
  $newname = $filename.Replace($ext, ".webp")
  $newfilepath = $filepath.Replace($filename, $newname)
  $cmd = "squoosh-cli --webp '{}' ./$filename"
  Write-Host $cmd
  Invoke-Expression $cmd
}

Write-Host "Done"