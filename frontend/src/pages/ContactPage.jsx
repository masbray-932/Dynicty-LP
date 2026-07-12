import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft, Send, Mail, Phone, Store } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";
import { CONTACT } from "@/constants/testIds";

const PLAN_OPTIONS = ["Belum yakin", "Starter", "Growth", "Enterprise"];

export default function ContactPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const prefilledPaket = params.get("paket") || "";
  const prefilledSrc = params.get("src") || "";

  const [form, setForm] = useState({
    nama: "",
    bisnis: "",
    kontak: "", // email atau WA
    paket: prefilledPaket && PLAN_OPTIONS.includes(prefilledPaket) ? prefilledPaket : "",
    pesan: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    // update prefill if URL changes
    if (prefilledPaket && PLAN_OPTIONS.includes(prefilledPaket)) {
      setForm((s) => ({ ...s, paket: prefilledPaket }));
    }
  }, [prefilledPaket]);

  const set = (k, v) => {
    setForm((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.nama || form.nama.trim().length < 2) e.nama = "Nama minimal 2 karakter.";
    if (!form.bisnis || form.bisnis.trim().length < 2) e.bisnis = "Nama bisnis wajib diisi.";
    const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.kontak);
    const isPhone = /^[+0-9\s()-]{6,20}$/.test(form.kontak);
    if (!isEmail && !isPhone) {
      e.kontak = "Isi email atau nomor WhatsApp yang valid.";
    }
    if (!form.pesan || form.pesan.trim().length < 5)
      e.pesan = "Pesan minimal 5 karakter.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Backend contact endpoint expects: {nama, email, pesan, honeypot?}
      // We need to map: kontak (email OR WA) + paket + bisnis into email/pesan fields.
      const looksLikeEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.kontak);
      const payload = {
        nama: form.nama.trim(),
        email: looksLikeEmail ? form.kontak.trim() : "kontak@dynicty-lead.local",
        pesan:
          `Bisnis: ${form.bisnis.trim()}\n` +
          `Kontak (email/WA): ${form.kontak.trim()}\n` +
          `Paket diminati: ${form.paket || "-"}\n` +
          (prefilledSrc ? `Sumber: ${prefilledSrc}\n` : "") +
          `\nPesan:\n${form.pesan.trim()}`,
        honeypot: form.honeypot,
      };
      const res = await submitContact(payload);
      setSuccess(true);
      toast.success(res?.message || "Pesan Anda telah kami terima.");
      // scroll top for success visibility
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail[0]?.msg || "Terjadi kesalahan validasi."
        : typeof detail === "string"
        ? detail
        : "Terjadi kesalahan. Silakan coba lagi.";
      setServerError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--dyn-bg-0))] text-white">
      <SEO
        title="Hubungi Kami — Dynicty"
        description="Hubungi tim Dynicty untuk informasi paket, onboarding, dan pertanyaan seputar toko online Anda sendiri."
        url="https://dynicty.com/kontak"
      />
      <Navbar />
      <main data-testid={CONTACT.root} className="dyn-container py-14 lg:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="mt-6 grid lg:grid-cols-12 gap-10">
          {/* Left copy */}
          <div className="lg:col-span-5">
            <div className="dyn-eyebrow">Hubungi Kami</div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Diskusikan <span className="dyn-brand-gradient-text">paket dan onboarding</span> untuk bisnis Anda.
            </h1>
            <p className="mt-4 text-white/65">
              Ceritakan sedikit tentang bisnis Anda. Tim Dynicty akan menghubungi Anda kembali
              dengan informasi paket, template, dan cara memulai.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Store className="h-4 w-4 text-white/80" />
                </div>
                <div>
                  <div className="text-sm text-white">Untuk pemilik brand & seller</div>
                  <div className="text-xs text-white/55">UMKM, brand lokal, seller Shopee / Tokopedia / TikTok Shop / Instagram / WhatsApp.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white/80" />
                </div>
                <div>
                  <div className="text-sm text-white">Response melalui email atau WhatsApp</div>
                  <div className="text-xs text-white/55">Kami akan membalas ke kontak yang Anda isi.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white/80" />
                </div>
                <div>
                  <div className="text-sm text-white">Diskusi paket yang tepat</div>
                  <div className="text-xs text-white/55">Kami bantu memilih paket sesuai kebutuhan bisnis Anda.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              {success ? (
                <div
                  data-testid={CONTACT.success}
                  className="flex flex-col items-center text-center gap-3 py-6"
                >
                  <div className="h-14 w-14 rounded-full dyn-brand-gradient-bg flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold">Pesan Anda berhasil dikirim!</h2>
                  <p className="text-white/65 text-sm max-w-md">
                    Terima kasih. Tim Dynicty akan menghubungi Anda melalui kontak yang telah
                    Anda berikan. Kami menghargai kesabaran Anda.
                  </p>
                  <div className="mt-2 flex flex-col sm:flex-row gap-2">
                    <Link to="/">
                      <Button variant="outline" className="bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white">
                        Kembali ke Beranda
                      </Button>
                    </Link>
                    <Button
                      onClick={() => { setSuccess(false); setForm({ nama:"", bisnis:"", kontak:"", paket:"", pesan:"", honeypot:"" }); }}
                      className="dyn-brand-gradient-bg text-white border-0 hover:opacity-90"
                    >
                      Kirim Pesan Lain
                    </Button>
                  </div>
                </div>
              ) : (
                <form data-testid={CONTACT.form} onSubmit={handleSubmit} className="grid gap-4" noValidate>
                  {serverError && (
                    <div
                      data-testid={CONTACT.error}
                      className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-100"
                    >
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="nama" className="text-white/85">Nama lengkap</Label>
                      <Input
                        id="nama"
                        data-testid={CONTACT.inputName}
                        value={form.nama}
                        onChange={(e) => set("nama", e.target.value)}
                        placeholder="Contoh: Andi Wijaya"
                        autoComplete="name"
                        className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-purple-500/40 transition-shadow"
                        aria-invalid={!!errors.nama}
                      />
                      {errors.nama && <p className="text-xs text-red-300">{errors.nama}</p>}
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="bisnis" className="text-white/85">Nama bisnis / brand</Label>
                      <Input
                        id="bisnis"
                        data-testid={CONTACT.inputBusiness}
                        value={form.bisnis}
                        onChange={(e) => set("bisnis", e.target.value)}
                        placeholder="Contoh: Sinar Telur"
                        className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-purple-500/40 transition-shadow"
                        aria-invalid={!!errors.bisnis}
                      />
                      {errors.bisnis && <p className="text-xs text-red-300">{errors.bisnis}</p>}
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="kontak" className="text-white/85">Email atau WhatsApp</Label>
                    <Input
                      id="kontak"
                      data-testid={CONTACT.inputEmail}
                      value={form.kontak}
                      onChange={(e) => set("kontak", e.target.value)}
                      placeholder="nama@brand.com atau +62 812 3456 7890"
                      autoComplete="email"
                      className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-purple-500/40 transition-shadow"
                      aria-invalid={!!errors.kontak}
                    />
                    {errors.kontak && <p className="text-xs text-red-300">{errors.kontak}</p>}
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="paket" className="text-white/85">Paket yang diminati</Label>
                    <select
                      id="paket"
                      data-testid={CONTACT.inputPlan}
                      value={form.paket}
                      onChange={(e) => set("paket", e.target.value)}
                      className="h-10 rounded-md bg-white/5 border border-white/10 text-white text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" className="bg-[hsl(var(--dyn-bg-1))]">Pilih paket (opsional)</option>
                      {PLAN_OPTIONS.map((p) => (
                        <option key={p} value={p} className="bg-[hsl(var(--dyn-bg-1))]">{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="pesan" className="text-white/85">Pesan</Label>
                    <Textarea
                      id="pesan"
                      data-testid={CONTACT.inputMessage}
                      value={form.pesan}
                      onChange={(e) => set("pesan", e.target.value)}
                      placeholder="Ceritakan sedikit tentang bisnis dan kebutuhan Anda."
                      rows={5}
                      className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 rounded-lg h-11 focus-visible:ring-2 focus-visible:ring-purple-500/40 transition-shadow"
                      aria-invalid={!!errors.pesan}
                    />
                    {errors.pesan && <p className="text-xs text-red-300">{errors.pesan}</p>}
                  </div>

                  {/* honeypot */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.honeypot}
                    onChange={(e) => set("honeypot", e.target.value)}
                    className="absolute -left-[9999px] h-0 w-0"
                    aria-hidden="true"
                  />

                  <div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      data-testid={CONTACT.submit}
                      className="w-full sm:w-auto dyn-brand-gradient-bg text-white border-0 hover:opacity-90 h-11 px-6"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Kirim Pesan
                        </>
                      )}
                    </Button>
                    <p className="mt-3 text-[11px] text-white/40">
                      Dengan mengirim, Anda menyetujui Kebijakan Privasi & Syarat Layanan Dynicty.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
