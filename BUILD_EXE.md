# Instrukcja kompilacji do pliku .exe

## Wymagania

- Node.js w wersji 18 lub wyższej
- npm lub yarn

## Kroki kompilacji

1. **Zainstaluj zależności** (jeśli jeszcze nie zostały zainstalowane):
   ```bash
   npm install
   ```

2. **Skompiluj aplikację do pliku .exe**:
   ```bash
   npm run build:exe
   ```

   To polecenie:
   - Skompiluje kod TypeScript do JavaScript (CommonJS)
   - Utworzy plik wykonywalny `ksef-pdf-generator.exe` dla Windows 64-bit

3. **Plik .exe będzie dostępny w głównym katalogu projektu** jako `ksef-pdf-generator.exe`

## Użycie wygenerowanego pliku .exe

### Tryb plikowy

#### Generowanie faktury PDF:
```bash
ksef-pdf-generator.exe -i invoice.xml -t invoice --nrKSeF "123-2025-ABC" --qrCode "https://example.com/qr"
```

#### Generowanie UPO PDF:
```bash
ksef-pdf-generator.exe -i upo.xml -t upo -o output.pdf
```

### Tryb strumieniowy (--stream)

W trybie strumieniowym aplikacja czyta XML ze standardowego wejścia (stdin) i zapisuje PDF do standardowego wyjścia (stdout). Błędy są zapisywane do stderr.

#### Generowanie faktury PDF (tryb strumieniowy):
```bash
# Windows PowerShell
Get-Content invoice.xml | .\ksef-pdf-generator.exe --stream -t invoice --nrKSeF "123-2025-ABC" --qrCode "https://example.com/qr" > output.pdf

# Windows CMD
type invoice.xml | ksef-pdf-generator.exe --stream -t invoice --nrKSeF "123-2025-ABC" --qrCode "https://example.com/qr" > output.pdf
```

#### Generowanie UPO PDF (tryb strumieniowy):
```bash
# Windows PowerShell
Get-Content upo.xml | .\ksef-pdf-generator.exe --stream -t upo > output.pdf

# Windows CMD
type upo.xml | ksef-pdf-generator.exe --stream -t upo > output.pdf
```

### Pomoc:
```bash
ksef-pdf-generator.exe --help
```

## Parametry

- `-i, --input <ścieżka>` - Ścieżka do pliku XML wejściowego (wymagane w trybie plikowym)
- `-o, --output <ścieżka>` - Ścieżka do pliku PDF wyjściowego (opcjonalne, tylko w trybie plikowym, domyślnie: nazwa pliku wejściowego z rozszerzeniem .pdf)
- `-t, --type <typ>` - Typ dokumentu: `invoice` lub `upo` (wymagane)
- `--nrKSeF <wartość>` - Numer KSeF (wymagane dla faktur)
- `--qrCode <url>` - URL kodu QR (wymagane dla faktur)
- `--stream` - Tryb strumieniowy: XML ze stdin, PDF do stdout
- `-h, --help` - Wyświetla pomoc

## Uwagi

- Plik .exe jest samodzielny i nie wymaga zainstalowanego Node.js do uruchomienia
- Wszystkie zależności są dołączone do pliku .exe
- Rozmiar pliku .exe może być dość duży (około 40-50 MB) ze względu na dołączony runtime Node.js
- Tryb strumieniowy (`--stream`) jest idealny do integracji z innymi aplikacjami, które mogą przekazywać dane przez stdin/stdout
- W trybie strumieniowym wszystkie komunikaty błędów są zapisywane do stderr, a dane wyjściowe (PDF) do stdout


