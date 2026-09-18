import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateFA1 } from './FA1-generator';
import { Faktura as Faktura1 } from './types/fa1.types';
import { generateFA2 } from './FA2-generator';
import { Faktura as Faktura2 } from './types/fa2.types';
import { generateFA3 } from './FA3-generator';
import { Faktura as Faktura3 } from './types/fa3.types';
import { AdditionalDataTypes } from './types/common.types';
import { generateFARR } from './FARR-generator';
import { FaRR } from './types/FaRR.types';
import { i18nReady } from './i18n/i18n-init';
import { generateCorrectivePEF } from './PEF-corrective-generator';
import { generateBasicPEF } from './PEF-basic-generator';
import { PEFBasicInvoice } from './types/pef-invoice.types';
import { PEFCorrectiveInvoice } from './types/pef-invoice-corrective.types';
import { PEFSpecInvoice } from './types/pef-invoice-spec.types';
import { generateSpecPEF } from './PEF-spec-generator';

//import { render } from 'svelte/server';
import { render, PdfmakeHtmlRenderer } from 'pdfmake-html-renderer/server';
import { PdfmakeHtmlRendererProps } from 'pdfmake-html-renderer';

pdfMake.addVirtualFileSystem(pdfFonts);

export async function generateInvoice(
  xml: unknown,
  additionalData: AdditionalDataTypes,
  formatType: 'blob'
): Promise<Blob>;
export async function generateInvoice(
  xml: unknown,
  additionalData: AdditionalDataTypes,
  formatType: 'base64'
): Promise<string>;
export async function generateInvoice(
  xml: unknown,
  additionalData: AdditionalDataTypes,
  formatType: 'html'
): Promise<Blob>;
export async function generateInvoice(
  xml: unknown,
  additionalData: AdditionalDataTypes,
  formatType: FormatType = 'blob'
): Promise<FormatTypeResult> {
  let doc: TDocumentDefinitions;
  const wersjaFa: any = (xml as any)?.Faktura?.Naglowek?.KodFormularza?._attributes?.kodSystemowy;
  const wersjaPef: any =
    (xml as any)?.Invoice?.ProfileID?._text ?? (xml as any)?.CreditNote?.ProfileID?._text;

  const wersja = wersjaFa ?? wersjaPef;

  await i18nReady;

  switch (wersja) {
    case 'FA (1)':
      doc = generateFA1((xml as any).Faktura as Faktura1, additionalData);
      break;
    case 'FA (2)':
      doc = generateFA2((xml as any).Faktura as Faktura2, additionalData);
      break;
    case 'FA (3)':
      doc = generateFA3((xml as any).Faktura as Faktura3, additionalData);
      break;
    case 'FA_RR (1)':
    case 'FA_RR(1)':
      doc = generateFARR((xml as any).Faktura as FaRR, additionalData);
      break;
    case 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0':
      doc = generateBasicPEF((xml as any).Invoice as PEFBasicInvoice, additionalData);
      break;
    case 'urn:fdc:www.efaktura.gov.pl:ver2.0:corr_inv:ver4.0':
      doc = generateCorrectivePEF((xml as any).CreditNote as PEFCorrectiveInvoice, additionalData);
      break;
    case 'urn:fdc:www.efaktura.gov.pl:ver2.0:plinv:ver1.4':
      doc = generateSpecPEF((xml as any).Invoice as PEFSpecInvoice, additionalData);
      break;
    default:
      throw new Error(`Unknown XML Version: ${wersja}`);
  }

  switch (formatType) {
    case 'html':
      {
        const htmlprops: PdfmakeHtmlRendererProps = {
          document: doc,
          pageShadow: false,
          mode: 'natural',
        };
        const { body, head } = render(PdfmakeHtmlRenderer, { props: htmlprops });
        const result =
          '<!DOCTYPE html><html lang="pl">' +
          '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">' +
          '<title>Faktura</title>' +
          head +
          '</head><body>' +
          body +
          '</body></html>';

        return new Blob([result], { type: 'text/html' });
      }
      break;
    case 'blob':
      return pdfMake.createPdf(doc).getBlob();
    case 'base64':
    default:
      return pdfMake.createPdf(doc).getBase64();
  }
}

type FormatType = 'blob' | 'base64' | 'html';
type FormatTypeResult = Blob | string;
