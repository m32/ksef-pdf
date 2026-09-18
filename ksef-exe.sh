#!/bin/bash
#set -x
exe=sea/exe/ksef-pdf-1.1.40

rm ksef-exe-*.html ksef-exe-*.pdf

if [ "$1" != "clean" ]; then
$exe \
-t invoice \
-i assets/invoice.xml \
--nrKSeF "1111111111-20251107-080080679C57-14" \
--qrCode "https://qr.ksef.mf.gov.pl/invoice/{nip}/{p1}/{hash}" \
--acdate 2026.05.02 \
-o ksef-exe-fa-online.pdf

$exe \
-t invoice \
-i assets/invoice.xml \
--nrKSeF "1111111111-20251107-080080679C57-14" \
--qrCode "https://qr.ksef.mf.gov.pl/invoice/{nip}/{p1}/{hash}" \
--qr2Code "https://qr.ksef.mf.gov.pl/certificate/Nip/1111111111/{nip}/01F20A5D352AE590/..." \
-o ksef-exe-fa-offline.pdf

$exe \
-t invoice \
-i assets/invoice.xml \
--nrKSeF "1111111111-20251107-080080679C57-14" \
--qrCode "https://qr.ksef.mf.gov.pl/invoice/{nip}/{p1}/{hash}" \
-o ksef-exe-fa-online.html \
--html

$exe \
-t invoice \
-i assets/invoice.xml \
--nrKSeF "1111111111-20251107-080080679C57-14" \
--qrCode "https://qr.ksef.mf.gov.pl/invoice/{nip}/{p1}/{hash}" \
--qr2Code "https://qr.ksef.mf.gov.pl/certificate/Nip/1111111111/{nip}/01F20A5D352AE590/..." \
-o ksef-exe-fa-offline.html \
--html

$exe \
-t upo \
-i assets/upo.xml \
-o ksef-exe-upo.pdf

$exe \
-t upo \
-i assets/upo.xml \
-o ksef-exe-upo.html \
--html
fi
