import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import * as api from '../api';

function OrderModalContent({ service }) {
  const { setOrderModalService, services, user, updateUser, showToast, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    business: '',
    serviceId: service.id || (services[0]?.id || ''),
    projectType: 'Proyek satu kali',
    budget: 'Belum ditentukan',
    brief: ''
  });
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    document.body.classList.add('modal-open');
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOrderModalService(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setOrderModalService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.business || !formData.brief) {
      showToast('Mohon lengkapi semua field yang berbintang (*).');
      return;
    }

    setSubmitting(true);
    try {
      const selectedSvc = services.find((s) => s.id === formData.serviceId) || service;
      const orderPayload = {
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          business: formData.business.trim()
        },
        serviceId: formData.serviceId,
        serviceName: selectedSvc?.name || 'Layanan SNG',
        projectType: formData.projectType,
        budget: formData.budget,
        brief: formData.brief.trim()
      };

      await api.createOrder(orderPayload);

      // Auto-set current user if not logged in
      if (!user || user.email !== formData.email) {
        updateUser({
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: 'user'
        });
      }

      setOrderModalService(null);
      showToast('Permintaan layanan berhasil dikirim dan tersimpan di database!');
      navigateTo('user-dashboard');
    } catch (err) {
      console.error('Failed to submit order:', err);
      showToast('Gagal mengirim permintaan: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOrderModalService(null);
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <small>SNG / Service order</small>
            <h2>Pesan Layanan SNG</h2>
          </div>
          <button
            className="modal-close"
            onClick={() => setOrderModalService(null)}
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ marginBottom: '20px' }}>
              Lengkapi brief berikut agar tim SNG dapat memahami kebutuhan bisnis Anda. Setelah dikirim, permintaan akan tersimpan di database dan masuk ke dashboard peninjauan.
            </p>

            <div className="form-grid">
              <div className="field">
                <label>Nama lengkap *</label>
                <input
                  name="name"
                  required
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>WhatsApp / telepon</label>
                <input
                  name="phone"
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Nama bisnis *</label>
                <input
                  name="business"
                  required
                  placeholder="Nama brand / usaha"
                  value={formData.business}
                  onChange={handleChange}
                />
              </div>

              <div className="field full">
                <label>Layanan yang dipesan *</label>
                <select
                  name="serviceId"
                  required
                  value={formData.serviceId}
                  onChange={handleChange}
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.label || s.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Jenis kebutuhan</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option>Proyek satu kali</option>
                  <option>Pendampingan bulanan</option>
                  <option>Konsultasi / audit</option>
                  <option>Belum yakin — perlu rekomendasi</option>
                </select>
              </div>

              <div className="field">
                <label>Kisaran anggaran</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="Belum ditentukan">Belum ditentukan</option>
                  <option>Di bawah Rp1.000.000</option>
                  <option>Rp1.000.000 – Rp3.000.000</option>
                  <option>Rp3.000.000 – Rp5.000.000</option>
                  <option>Rp5.000.000 – Rp10.000.000</option>
                  <option>Di atas Rp10.000.000</option>
                </select>
              </div>

              <div className="field full">
                <label>Ceritakan tujuan dan kebutuhan proyek *</label>
                <textarea
                  name="brief"
                  required
                  placeholder="Contoh: ingin meningkatkan brand awareness, mengelola Instagram, atau membangun website..."
                  value={formData.brief}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <p className="form-note">
              Belum ada pembayaran pada tahap ini. Harga, timeline, dan ruang lingkup akan dibahas setelah tim meninjau brief Anda.
            </p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              style={{ color: '#343540', borderColor: 'rgba(20,20,30,.2)' }}
              onClick={() => setOrderModalService(null)}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-dark" disabled={submitting}>
              {submitting ? 'Mengirim...' : 'Kirim permintaan ↗'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OrderModal() {
  const { orderModalService } = useApp();
  if (!orderModalService) return null;
  return <OrderModalContent key={orderModalService.id || 'order-modal'} service={orderModalService} />;
}
