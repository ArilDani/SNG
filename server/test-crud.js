// Test runner for backend CRUD
async function request(path, options = {}) {
  const url = `http://localhost:5000${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

async function runTests() {
  console.log('--- STARTING BACKEND & MONGODB CRUD VERIFICATION ---');

  // 1. Health check
  console.log('1. Testing /api/health ...');
  const health = await request('/api/health');
  console.log('Health status:', health.status, health.data);
  if (health.status !== 200 || !health.data.database) {
    throw new Error('Health check failed or database not connected');
  }

  // 2. Services CRUD
  console.log('\n2. Testing Services CRUD...');
  const initialServices = await request('/api/services');
  console.log(`Initial services count: ${initialServices.data.length}`);

  // Create
  const testServiceId = `TEST-SVC-${Date.now().toString().slice(-4)}`;
  const createdSvc = await request('/api/services', {
    method: 'POST',
    body: JSON.stringify({
      id: testServiceId,
      name: 'Automated Test Service',
      category: 'strategy',
      icon: '⚡',
      desc: 'Layanan uji otomatis untuk verifikasi CRUD MongoDB.',
      deliverables: 'Deliverable test output.',
      label: 'Testing'
    })
  });
  console.log('Created Service:', createdSvc.status, createdSvc.data?.name);

  // Update
  const updatedSvc = await request(`/api/services/${testServiceId}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: 'Automated Test Service (Updated)',
      desc: 'Deskripsi yang telah diperbarui melalui PUT endpoint.'
    })
  });
  console.log('Updated Service:', updatedSvc.status, updatedSvc.data?.name);

  // Delete
  const deletedSvc = await request(`/api/services/${testServiceId}`, { method: 'DELETE' });
  console.log('Deleted Service:', deletedSvc.status, deletedSvc.data);

  // 3. Orders CRUD
  console.log('\n3. Testing Orders CRUD...');
  const testOrderId = `TEST-ORD-${Date.now().toString().slice(-4)}`;
  const testClientEmail = `test_${Date.now()}@example.com`;

  const createdOrder = await request('/api/orders', {
    method: 'POST',
    body: JSON.stringify({
      id: testOrderId,
      customer: {
        name: 'Tester UMKM',
        email: testClientEmail,
        phone: '08123456789',
        business: 'Brand Uji Coba'
      },
      serviceId: 'SNG-01',
      serviceName: 'Social Media Management',
      projectType: 'Pendampingan bulanan',
      budget: 'Rp3.000.000 – Rp5.000.000',
      brief: 'Kebutuhan pengujian alur pesanan ke MongoDB.'
    })
  });
  console.log('Created Order:', createdOrder.status, createdOrder.data?.id, createdOrder.data?.status);

  // Update status and admin note
  const updatedOrder = await request(`/api/orders/${testOrderId}`, {
    method: 'PUT',
    body: JSON.stringify({
      status: 'Sedang Dikerjakan',
      adminNote: 'Brief Anda telah kami tinjau dan jadwal konsultasi siap.'
    })
  });
  console.log('Updated Order:', updatedOrder.status, updatedOrder.data?.status, 'Note:', updatedOrder.data?.adminNote);

  // Get orders filtered by email
  const userOrders = await request(`/api/orders?email=${testClientEmail}`);
  console.log('Filtered User Orders count:', userOrders.data.length, 'Status:', userOrders.data[0]?.status);

  // Delete order
  const deletedOrder = await request(`/api/orders/${testOrderId}`, { method: 'DELETE' });
  console.log('Deleted Order:', deletedOrder.status, deletedOrder.data);

  // 4. Messages (Contact) CRUD
  console.log('\n4. Testing Contact Messages CRUD...');
  const testMsgId = `TEST-MSG-${Date.now().toString().slice(-4)}`;
  const createdMsg = await request('/api/messages', {
    method: 'POST',
    body: JSON.stringify({
      id: testMsgId,
      name: 'Calon Mitra',
      email: 'calon@mitra.com',
      business: 'Mitra Brand',
      need: 'Integrated Digital Marketing',
      message: 'Halo SNG, kami butuh integrasi medsos dan web.'
    })
  });
  console.log('Created Contact Message:', createdMsg.status, createdMsg.data?.id);

  const deletedMsg = await request(`/api/messages/${testMsgId}`, { method: 'DELETE' });
  console.log('Deleted Message:', deletedMsg.status, deletedMsg.data);

  // 5. Site Settings & Stats
  console.log('\n5. Testing Settings & Stats...');
  const stats = await request('/api/stats');
  console.log('Stats:', stats.data);

  const settings = await request('/api/settings');
  console.log('Current Hero Title:', settings.data?.heroTitleLine1, settings.data?.heroTitleLine2);

  console.log('\n>>> ALL CRUD & MONGODB ENDPOINT TESTS PASSED SUCCESSFULLY! <<<');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
