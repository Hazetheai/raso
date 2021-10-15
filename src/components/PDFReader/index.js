import Button from "components/Button";
import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { pdfjs } from "react-pdf";
// import samplePDF from "res/pdfs/raso/married_letters/Finanzamt_Istversteuerung.pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faPlus,
  faMinus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./pdf-reader.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(window.innerHeight / 1000 + 0.2);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  function zoomOut() {
    setZoomLevel(zoomLevel - 0.1);
  }

  function zoomIn() {
    setZoomLevel(zoomLevel + 0.1);
  }
  return (
    <>
      <div className="pdf-reader">
        <div className="pdf-reader-content">
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page scale={zoomLevel} pageNumber={pageNumber} />
          </Document>
        </div>

        <div className="pdf-reader-controls flex-container flex-container--space-between">
          <div className="pdf-reader-navigation">
            <Button fluid disabled={pageNumber <= 1} func={previousPage}>
              <FontAwesomeIcon className="faq-icon" icon={faArrowLeft} />
            </Button>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <Button fluid disabled={pageNumber >= numPages} func={nextPage}>
              <FontAwesomeIcon className="faq-icon" icon={faArrowRight} />
            </Button>
          </div>
          <div className="pdf-reader-zoom">
            <Button fluid disabled={zoomLevel - 0.1 <= 0.4} func={zoomOut}>
              <FontAwesomeIcon className="faq-icon" icon={faMinus} />
            </Button>
            <FontAwesomeIcon className="faq-icon zoom-icon" icon={faSearch} />
            <Button fluid disabled={zoomLevel + 0.1 >= 3} func={zoomIn}>
              <FontAwesomeIcon className="faq-icon" icon={faPlus} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFReader;
