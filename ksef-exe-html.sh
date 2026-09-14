#!/bin/bash
#set -x

exe=sea/exe/ksef-pdf-1.1.36

$exe \
-t invoice \
-i assets/invoice.xml \
--nrKSeF "1111111111-20251107-080080679C57-14" \
--qrCode "https://qr.ksef.mf.gov.pl/invoice/{nip}/{p1}/{hash}" \
-o ksef-exe-fa-online.html \
--html
