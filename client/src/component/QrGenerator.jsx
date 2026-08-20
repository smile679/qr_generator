import { useState } from "react";
import QRCode from "qrcode";

const QRGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQR = async () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    try {
      const generatedQR = await QRCode.toDataURL(url, {
        width: 500,
        margin: 2,
        errorCorrectionLevel: "H",
      });

      setQrCode(generatedQR);
    } catch (error) {
      console.error("QR generation failed:", error);
    }
  };

  const downloadPNG = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "permanent-qr-code.png";
    link.click();
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">Permanent QR Generator</h1>

          <p className="mt-3 text-slate-400">
            Enter a permanent URL and generate a QR code.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 shadow-xl">
          <label className="mb-2 block text-sm font-medium">
            Website or Digital Menu URL
          </label>

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/menu"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-cyan-400"
          />

          <button
            onClick={generateQR}
            className="mt-4 w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Generate QR Code
          </button>

          {qrCode && (
            <div className="mt-8 text-center">
              <div className="inline-block rounded-2xl bg-white p-4">
                <img
                  src={qrCode}
                  alt="Generated QR Code"
                  className="h-64 w-64"
                />
              </div>

              <button
                onClick={downloadPNG}
                className="mt-5 w-full rounded-xl border border-slate-700 px-4 py-3 font-medium transition hover:bg-slate-800"
              >
                Download PNG
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default QRGenerator;
