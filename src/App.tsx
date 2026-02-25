/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  FileText, 
  Calendar, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight,
  Car,
  Coffee,
  Building2,
  Clock,
  Camera,
  Video,
  Trash2,
  Edit3,
  Plus,
  TrendingUp,
  PieChart as PieChartIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { View, AgendaItem, Guest, RundownItem, SpeechDraft, HouseholdService, DocumentationItem } from './types';
import { cn } from './utils';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// View Components
const DashboardView = ({ 
  onAction, 
  agendas, 
  guests, 
  services 
}: { 
  onAction: (type: string) => void, 
  agendas: AgendaItem[],
  guests: Guest[],
  services: HouseholdService[]
}) => {
  // Process data for charts
  const activityData = [
    { name: 'Sen', protokol: 4, rumahTangga: 2 },
    { name: 'Sel', protokol: agendas.length, rumahTangga: services.length },
    { name: 'Rab', protokol: 3, rumahTangga: 5 },
    { name: 'Kam', protokol: 5, rumahTangga: 3 },
    { name: 'Jum', protokol: 2, rumahTangga: 4 },
  ];

  const statusData = [
    { name: 'Selesai', value: services.filter(s => s.status === 'Selesai').length || 1 },
    { name: 'Proses', value: services.filter(s => s.status === 'Proses').length || 1 },
    { name: 'Menunggu', value: services.filter(s => s.status === 'Menunggu').length || 2 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Selamat datang di Sistem PAKBUIM.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onAction('agenda')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Agenda Baru
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Agenda Hari Ini', value: agendas.length.toString(), icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Tamu Protokol', value: guests.length.toString(), icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Draft Narasi', value: '3', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Layanan RT', value: services.length.toString(), icon: Home, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Volume Kegiatan Mingguan
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="protokol" name="Protokol" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="rumahTangga" name="Rumah Tangga" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-emerald-500" />
              Status Layanan Rumah Tangga
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            Agenda Terdekat
          </h2>
          <div className="space-y-4">
            {agendas.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="text-sm font-mono text-slate-500 mt-1">{item.time.split(' - ')[0]}</div>
                <div>
                  <div className="font-medium text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-400" />
            Notifikasi Terbaru
          </h2>
          <div className="space-y-4">
            {[
              { msg: 'Permintaan kendaraan baru dari Sekretariat', time: '10 menit yang lalu' },
              { msg: 'Draft pidato HUT RI telah diperbarui', time: '1 jam yang lalu' },
              { msg: 'Konfirmasi kehadiran tamu asing', time: '3 jam yang lalu' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border-l-2 border-blue-500 bg-blue-50/30 rounded-r-xl">
                <div className="flex-1">
                  <div className="text-sm text-slate-800">{item.msg}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProtokolView = ({ 
  onAction, 
  guests, 
  rundown,
  onDelete
}: { 
  onAction: (type: string, item?: any) => void, 
  guests: Guest[], 
  rundown: RundownItem[],
  onDelete: (type: string, id: string) => void
}) => (
  <div className="space-y-6">
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Protokol</h1>
        <p className="text-slate-500">Manajemen agenda, tamu, dan rundown acara.</p>
      </div>
      <button 
        onClick={() => onAction('tamu')}
        className="px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold text-sm hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2"
      >
        <Users className="w-4 h-4" />
        Tambah Tamu
      </button>
    </header>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button 
        onClick={() => onAction('tamu')}
        className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
      >
        <Users className="w-8 h-8 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
        <h3 className="font-semibold text-slate-900">Daftar Tamu</h3>
        <p className="text-sm text-slate-500 mt-1">Kelola registrasi dan konfirmasi tamu pimpinan.</p>
      </button>
      <button 
        onClick={() => onAction('rundown')}
        className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
      >
        <LayoutDashboard className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
        <h3 className="font-semibold text-slate-900">Rundown Acara</h3>
        <p className="text-sm text-slate-500 mt-1">Susun tata tempat dan urutan upacara/acara.</p>
      </button>
      <button 
        onClick={() => onAction('agenda')}
        className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
      >
        <Calendar className="w-8 h-8 text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
        <h3 className="font-semibold text-slate-900">Penjadwalan</h3>
        <p className="text-sm text-slate-500 mt-1">Sinkronisasi jadwal dengan tim protokol.</p>
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-900">Tamu Mendatang</h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">Nama Tamu</th>
                <th className="px-6 py-3 font-medium">Instansi</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {guests.map((tamu, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{tamu.name}</td>
                  <td className="px-6 py-4 text-slate-600">{tamu.organization}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      "bg-emerald-50 text-emerald-700"
                    )}>
                      Terkonfirmasi
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => onAction('tamu', tamu)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete('tamu', tamu.id)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Rundown Hari Ini</h2>
        <div className="relative space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
          {rundown.map((item, i) => (
            <div key={i} className="relative pl-8 group">
              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-500 z-10" />
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold text-blue-600 mb-1">{item.time}</div>
                  <div className="font-medium text-slate-900 text-sm">{item.activity}</div>
                  <div className="text-xs text-slate-500">PIC: {item.pic}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onAction('rundown', item)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => onDelete('rundown', item.id)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => onAction('rundown')}
          className="w-full mt-6 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Tambah Rundown
        </button>
      </div>
    </div>
  </div>
);

const RumahTanggaView = ({ 
  onAction, 
  services,
  onDelete
}: { 
  onAction: (type: string, item?: any) => void, 
  services: HouseholdService[],
  onDelete: (id: string) => void
}) => (
  <div className="space-y-6">
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Rumah Tangga</h1>
        <p className="text-slate-500">Manajemen konsumsi dan layanan rumah tangga pimpinan.</p>
      </div>
      <button 
        onClick={() => onAction('konsumsi')}
        className="px-4 py-2 bg-amber-600 text-white rounded-xl font-semibold text-sm hover:bg-amber-700 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
      >
        <Coffee className="w-4 h-4" />
        Tambah Pesanan
      </button>
    </header>

    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="font-semibold text-slate-900">Daftar Layanan Rumah Tangga</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-medium">Hari/Tanggal</th>
              <th className="px-6 py-3 font-medium">Agenda</th>
              <th className="px-6 py-3 font-medium">Lokasi</th>
              <th className="px-6 py-3 font-medium">Menu Konsumsi</th>
              <th className="px-6 py-3 font-medium">Lampiran</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors text-sm">
                <td className="px-6 py-4 font-medium text-slate-900">{item.date}</td>
                <td className="px-6 py-4 text-slate-600">{item.agenda}</td>
                <td className="px-6 py-4 text-slate-600">{item.location}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.menu.split(', ').map(m => (
                      <span key={m} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-bold uppercase">{m}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs">{item.files} File</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                    item.status === 'Selesai' ? "bg-emerald-50 text-emerald-700" : 
                    item.status === 'Proses' ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"
                  )}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button 
                      onClick={() => onAction('konsumsi', item)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const NarasiView = ({ 
  onAction, 
  drafts, 
  searchQuery, 
  onSearchChange,
  onDelete
}: { 
  onAction: (type: string, item?: any) => void, 
  drafts: SpeechDraft[], 
  searchQuery: string, 
  onSearchChange: (val: string) => void,
  onDelete: (id: string) => void
}) => (
  <div className="space-y-6">
    <header>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Narasi</h1>
      <p className="text-slate-500">Penyusunan pidato dan sambutan pimpinan.</p>
    </header>

    <div className="flex gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Cari draft narasi..." 
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>
      <button 
        onClick={() => onAction('narasi')}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <FileText className="w-4 h-4" />
        Buat Draft Baru
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {drafts.map((draft, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all cursor-pointer group relative">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors pr-16">{draft.title}</h3>
            <div className="flex flex-col items-end gap-2">
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                draft.status === 'Final' ? "bg-emerald-100 text-emerald-700" : 
                draft.status === 'Review' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
              )}>
                {draft.status}
              </span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => { e.stopPropagation(); onAction('narasi', draft); }}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(draft.id); }}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {draft.pimpinan}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {draft.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AgendaView = ({ 
  onAction, 
  agendas, 
  onDelete 
}: { 
  onAction: (type: string, item?: any) => void, 
  agendas: AgendaItem[],
  onDelete: (id: string) => void
}) => (
  <div className="space-y-6">
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agenda</h1>
        <p className="text-slate-500">Sinkronisasi agenda pimpinan secara real-time.</p>
      </div>
      <button 
        onClick={() => onAction('agenda')}
        className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Tambah Agenda
      </button>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Mini Calendar Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-slate-900">Februari 2026</span>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-slate-50 rounded"><ChevronRight className="w-4 h-4 rotate-180" /></button>
              <button className="p-1 hover:bg-slate-50 rounded"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map(d => (
              <span key={d} className="text-[10px] font-bold text-slate-400">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 28 }).map((_, i) => (
              <button 
                key={i} 
                className={cn(
                  "aspect-square flex items-center justify-center text-xs rounded-lg transition-colors",
                  i + 1 === 24 ? "bg-blue-600 text-white font-bold" : "hover:bg-slate-50 text-slate-600"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-3 text-sm">Kategori</h3>
          <div className="space-y-2">
            {[
              { label: 'Internal', color: 'bg-blue-500' },
              { label: 'Dinas Luar', color: 'bg-emerald-500' },
              { label: 'Audiensi', color: 'bg-purple-500' },
              { label: 'Pribadi', color: 'bg-amber-500' },
            ].map(cat => (
              <div key={cat.label} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <div className={cn("w-2 h-2 rounded-full", cat.color)} />
                {cat.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Agenda List */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-900">Selasa, 24 Februari 2026</span>
          </div>
          <div className="flex bg-slate-200 p-1 rounded-lg">
            <button className="px-3 py-1 bg-white rounded-md text-xs font-bold shadow-sm">Hari</button>
            <button className="px-3 py-1 text-xs font-bold text-slate-600">Minggu</button>
            <button className="px-3 py-1 text-xs font-bold text-slate-600">Bulan</button>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {agendas.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-4 rounded-2xl border-l-4 bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all flex justify-between items-center",
                  item.status === 'confirmed' ? "border-blue-500" : "border-slate-300"
                )}
              >
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-500 font-bold mb-1">{item.time}</div>
                  <div className="font-bold text-slate-900">{item.title}</div>
                  <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <Building2 className="w-3 h-3" />
                    {item.location}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    {item.status}
                  </span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => onAction('agenda', item)}
                      className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DokumentasiView = ({ 
  onAction, 
  items, 
  onDelete 
}: { 
  onAction: (type: string, item?: any) => void, 
  items: DocumentationItem[],
  onDelete: (id: string) => void
}) => {
  const [filter, setFilter] = useState<'All' | 'Protokol' | 'Rumah Tangga'>('All');
  
  const filteredItems = items.filter(item => filter === 'All' || item.category === filter);

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dokumentasi</h1>
          <p className="text-slate-500">Arsip foto dan video kegiatan.</p>
        </div>
        <button 
          onClick={() => onAction('dokumentasi')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Upload Baru
        </button>
      </header>

      <div className="flex gap-2 p-1 bg-slate-100 w-fit rounded-xl">
        {['All', 'Protokol', 'Rumah Tangga'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div 
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group relative"
          >
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2">
                <span className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white",
                  item.category === 'Protokol' ? "bg-purple-600" : "bg-amber-600"
                )}>
                  {item.category}
                </span>
              </div>
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                    <Video className="w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.date}</p>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => onAction('dokumentasi', item)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [modal, setModal] = useState<{ open: boolean, type: string }>({ open: false, type: '' });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Helper for persistent state
  const usePersistentState = <T,>(key: string, initialValue: T) => {
    const [state, setState] = useState<T>(() => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;
  };

  // Application State
  const [agendas, setAgendas] = usePersistentState<AgendaItem[]>('pakbuim_agendas', [
    { id: '1', title: 'Apel Pagi & Pengarahan', location: 'Halaman Kantor', date: '2026-02-24', time: '08:00 - 09:30', description: '', status: 'confirmed' },
    { id: '2', title: 'Rapat Paripurna DPRD', location: 'Gedung DPRD', date: '2026-02-24', time: '10:00 - 12:00', description: '', status: 'confirmed' },
    { id: '3', title: 'Audiensi Tokoh Masyarakat', location: 'Ruang Tamu VIP', date: '2026-02-24', time: '13:30 - 15:00', description: '', status: 'pending' },
    { id: '4', title: 'Evaluasi Kinerja Mingguan', location: 'Ruang Kerja', date: '2026-02-24', time: '16:00 - 17:30', description: '', status: 'pending' },
  ]);

  const [guests, setGuests] = usePersistentState<Guest[]>('pakbuim_guests', [
    { id: '1', name: 'Bpk. Ahmad Subarjo', organization: 'Kemendagri', role: 'Pejabat' },
    { id: '2', name: 'Ibu Siti Aminah', organization: 'Pemprov Jatim', role: 'Staf' },
    { id: '3', name: 'Delegasi UNESCO', organization: 'International', role: 'Tamu' },
  ]);

  const [rundown, setRundown] = usePersistentState<RundownItem[]>('pakbuim_rundown', [
    { id: '1', time: '08:00', activity: 'Persiapan Pasukan', pic: 'Danup' },
    { id: '2', time: '08:30', activity: 'Kedatangan Pimpinan', pic: 'Protokol' },
    { id: '3', time: '09:00', activity: 'Upacara Pembukaan', pic: 'MC' },
    { id: '4', time: '10:30', activity: 'Ramah Tamah', pic: 'RT' },
  ]);

  const [drafts, setDrafts] = usePersistentState<SpeechDraft[]>('pakbuim_drafts', [
    { id: '1', title: 'Sambutan Pembukaan Seminar Nasional', pimpinan: 'Gubernur', date: '24 Feb 2026', status: 'Draft' },
    { id: '2', title: 'Pidato Hari Jadi Provinsi ke-78', pimpinan: 'Sekretaris Daerah', date: '22 Feb 2026', status: 'Review' },
    { id: '3', title: 'Sambutan Penerimaan Tamu Asing', pimpinan: 'Gubernur', date: '20 Feb 2026', status: 'Final' },
  ]);

  const [householdServices, setHouseholdServices] = usePersistentState<HouseholdService[]>('pakbuim_services', [
    { id: '1', date: 'Selasa, 24 Feb 2026', agenda: 'Rapat Koordinasi Pimpinan', location: 'Ruang Rapat Utama', menu: 'Snack, Jamuan', files: 2, status: 'Selesai' },
    { id: '2', date: 'Rabu, 25 Feb 2026', agenda: 'Penerimaan Tamu Delegasi', location: 'Lobby VIP', menu: 'Catteriing', files: 0, status: 'Proses' },
    { id: '3', date: 'Kamis, 26 Feb 2026', agenda: 'Kunjungan Kerja', location: 'Sektor Barat', menu: 'Snack', files: 1, status: 'Menunggu' },
  ]);

  const [documentationItems, setDocumentationItems] = usePersistentState<DocumentationItem[]>('pakbuim_docs', [
    { id: '1', title: 'Rapat Koordinasi Wilayah', category: 'Protokol', type: 'image', url: 'https://picsum.photos/seed/doc1/800/600', date: '24 Feb 2026' },
    { id: '2', title: 'Penyajian Jamuan Tamu VIP', category: 'Rumah Tangga', type: 'image', url: 'https://picsum.photos/seed/doc2/800/600', date: '23 Feb 2026' },
    { id: '3', title: 'Video Dokumentasi Upacara', category: 'Protokol', type: 'video', url: 'https://picsum.photos/seed/doc3/800/600', date: '22 Feb 2026' },
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'protokol', label: 'Protokol', icon: Users },
    { id: 'rumah-tangga', label: 'Rumah Tangga', icon: Home },
    { id: 'narasi', label: 'Narasi', icon: FileText },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'dokumentasi', label: 'Dokumentasi', icon: Camera },
  ];

  const handleAction = (type: string, item?: any) => {
    setEditingItem(item || null);
    setModal({ open: true, type });
  };

  const handleDelete = (type: string, id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    
    switch (type) {
      case 'agenda': setAgendas(agendas.filter(a => a.id !== id)); break;
      case 'tamu': setGuests(guests.filter(g => g.id !== id)); break;
      case 'rundown': setRundown(rundown.filter(r => r.id !== id)); break;
      case 'narasi': setDrafts(drafts.filter(d => d.id !== id)); break;
      case 'rumah-tangga': setHouseholdServices(householdServices.filter(s => s.id !== id)); break;
      case 'dokumentasi': setDocumentationItems(documentationItems.filter(d => d.id !== id)); break;
    }
  };

  const renderView = () => {
    const filteredAgendas = agendas.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredGuests = guests.filter(g => 
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      g.organization.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredDrafts = drafts.filter(d => 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.pimpinan.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredServices = householdServices.filter(s => 
      s.agenda.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredDocs = documentationItems.filter(d => 
      d.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (activeView) {
      case 'dashboard': return <DashboardView onAction={handleAction} agendas={filteredAgendas} guests={filteredGuests} services={filteredServices} />;
      case 'protokol': return <ProtokolView onAction={handleAction} guests={filteredGuests} rundown={rundown} onDelete={(id) => handleDelete('tamu', id)} />;
      case 'rumah-tangga': return <RumahTanggaView onAction={handleAction} services={filteredServices} onDelete={(id) => handleDelete('rumah-tangga', id)} />;
      case 'narasi': return <NarasiView onAction={handleAction} drafts={filteredDrafts} searchQuery={searchQuery} onSearchChange={setSearchQuery} onDelete={(id) => handleDelete('narasi', id)} />;
      case 'agenda': return <AgendaView onAction={handleAction} agendas={filteredAgendas} onDelete={(id) => handleDelete('agenda', id)} />;
      case 'dokumentasi': return <DokumentasiView onAction={handleAction} items={filteredDocs} onDelete={(id) => handleDelete('dokumentasi', id)} />;
      default: return <DashboardView onAction={handleAction} agendas={filteredAgendas} guests={filteredGuests} services={filteredServices} />;
    }
  };

  const getModalContent = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      
      const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      if (type === 'agenda') {
        const itemData: AgendaItem = {
          id: editingItem?.id || Math.random().toString(36).substr(2, 9),
          title: formData.get('title') as string,
          date: formData.get('date') as string,
          time: formData.get('time') as string,
          location: formData.get('location') as string,
          description: '',
          status: editingItem?.status || 'pending'
        };
        if (editingItem) {
          setAgendas(agendas.map(a => a.id === editingItem.id ? itemData : a));
        } else {
          setAgendas([itemData, ...agendas]);
        }
      } else if (type === 'tamu') {
        const itemData: Guest = {
          id: editingItem?.id || Math.random().toString(36).substr(2, 9),
          name: formData.get('name') as string,
          organization: formData.get('organization') as string,
          role: 'Tamu'
        };
        if (editingItem) {
          setGuests(guests.map(g => g.id === editingItem.id ? itemData : g));
        } else {
          setGuests([itemData, ...guests]);
        }
      } else if (type === 'konsumsi') {
        const mediaFile = formData.get('media') as File;
        let fileCount = editingItem?.files || 0;
        if (mediaFile && mediaFile.size > 0) {
          fileCount += 1;
        }

        const itemData: HouseholdService = {
          id: editingItem?.id || Math.random().toString(36).substr(2, 9),
          date: formData.get('date') as string,
          agenda: formData.get('agenda') as string,
          location: formData.get('location') as string,
          menu: Array.from(formData.getAll('menu')).join(', '),
          files: fileCount,
          status: editingItem?.status || 'Menunggu'
        };
        if (editingItem) {
          setHouseholdServices(householdServices.map(s => s.id === editingItem.id ? itemData : s));
        } else {
          setHouseholdServices([itemData, ...householdServices]);
        }
      } else if (type === 'narasi') {
        const itemData: SpeechDraft = {
          id: editingItem?.id || Math.random().toString(36).substr(2, 9),
          title: formData.get('title') as string,
          pimpinan: formData.get('pimpinan') as string,
          date: editingItem?.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: editingItem?.status || 'Draft'
        };
        if (editingItem) {
          setDrafts(drafts.map(d => d.id === editingItem.id ? itemData : d));
        } else {
          setDrafts([itemData, ...drafts]);
        }
      } else if (type === 'rundown') {
        const itemData: RundownItem = {
          id: editingItem?.id || Math.random().toString(36).substr(2, 9),
          time: formData.get('time') as string,
          activity: formData.get('activity') as string,
          pic: formData.get('pic') as string
        };
        if (editingItem) {
          setRundown(rundown.map(r => r.id === editingItem.id ? itemData : r).sort((a, b) => a.time.localeCompare(b.time)));
        } else {
          setRundown([...rundown, itemData].sort((a, b) => a.time.localeCompare(b.time)));
        }
      } else if (type === 'dokumentasi') {
        const mediaFile = formData.get('media') as File;
        let mediaUrl = editingItem?.url || `https://picsum.photos/seed/${Math.random()}/800/600`;
        
        if (mediaFile && mediaFile.size > 0) {
          try {
            mediaUrl = await readFileAsDataURL(mediaFile);
          } catch (err) {
            console.error("Failed to read file", err);
          }
        }

        const itemData: DocumentationItem = {
          id: editingItem?.id || Math.random().toString(36).substr(2, 9),
          title: formData.get('title') as string,
          category: formData.get('category') as any,
          type: formData.get('type') as any,
          url: mediaUrl,
          date: editingItem?.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        if (editingItem) {
          setDocumentationItems(documentationItems.map(d => d.id === editingItem.id ? itemData : d));
        } else {
          setDocumentationItems([itemData, ...documentationItems]);
        }
      }

      setModal({ open: false, type: '' });
      setEditingItem(null);
    };

    switch (modal.type) {
      case 'agenda':
        return (
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, 'agenda')}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Judul Agenda</label>
              <input name="title" defaultValue={editingItem?.title} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Masukkan judul..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal</label>
                <input name="date" defaultValue={editingItem?.date} required type="date" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Waktu</label>
                <input name="time" defaultValue={editingItem?.time} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="08:00 - 10:00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Lokasi</label>
              <input name="location" defaultValue={editingItem?.location} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Nama ruangan/tempat..." />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">
              {editingItem ? 'Update Agenda' : 'Simpan Agenda'}
            </button>
          </form>
        );
      case 'tamu':
        return (
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, 'tamu')}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nama Tamu</label>
              <input name="name" defaultValue={editingItem?.name} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Nama lengkap..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Instansi</label>
              <input name="organization" defaultValue={editingItem?.organization} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Asal instansi..." />
            </div>
            <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all mt-4">
              {editingItem ? 'Update Tamu' : 'Daftarkan Tamu'}
            </button>
          </form>
        );
      case 'konsumsi':
        return (
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, 'konsumsi')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Hari/Tanggal</label>
                <input name="date" defaultValue={editingItem?.date} required type="date" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Lokasi</label>
                <input name="location" defaultValue={editingItem?.location} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 outline-none" placeholder="Nama ruangan..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Agenda</label>
              <input name="agenda" defaultValue={editingItem?.agenda} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 outline-none" placeholder="Nama kegiatan..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Menu Konsumsi</label>
              <div className="flex flex-wrap gap-3">
                {['Snack', 'Jamuan', 'Catteriing'].map(menu => (
                  <label key={menu} className="flex items-center gap-2 cursor-pointer group">
                    <input name="menu" value={menu} defaultChecked={editingItem?.menu.includes(menu)} type="checkbox" className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900">{menu}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Upload Foto/Video</label>
              <input name="media" type="file" accept="image/*,video/*" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
            </div>
            <button type="submit" className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all mt-4 shadow-lg shadow-amber-500/20">
              {editingItem ? 'Update Pesanan' : 'Simpan Pesanan'}
            </button>
          </form>
        );
      case 'narasi':
        return (
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, 'narasi')}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Judul Narasi</label>
              <input name="title" defaultValue={editingItem?.title} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Contoh: Sambutan HUT RI..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Pimpinan</label>
              <select name="pimpinan" defaultValue={editingItem?.pimpinan} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none">
                <option>Gubernur</option>
                <option>Wakil Gubernur</option>
                <option>Sekretaris Daerah</option>
              </select>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">
              {editingItem ? 'Update Draft' : 'Buat Draft'}
            </button>
          </form>
        );
      case 'rundown':
        return (
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, 'rundown')}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Waktu</label>
                <input name="time" defaultValue={editingItem?.time} required type="time" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">PIC</label>
                <input name="pic" defaultValue={editingItem?.pic} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Nama/Bagian..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Kegiatan</label>
              <input name="activity" defaultValue={editingItem?.activity} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Deskripsi kegiatan..." />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">
              {editingItem ? 'Update Rundown' : 'Tambah Rundown'}
            </button>
          </form>
        );
      case 'dokumentasi':
        return (
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, 'dokumentasi')}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Judul Dokumentasi</label>
              <input name="title" defaultValue={editingItem?.title} required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="Nama kegiatan..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Kategori</label>
                <select name="category" defaultValue={editingItem?.category} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none">
                  <option value="Protokol">Protokol</option>
                  <option value="Rumah Tangga">Rumah Tangga</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tipe Media</label>
                <select name="type" defaultValue={editingItem?.type} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none">
                  <option value="image">Foto</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Pilih File</label>
              <input name="media" type="file" accept="image/*,video/*" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
              <p className="text-[10px] text-slate-500 mt-1">Pilih foto atau video dari perangkat Anda.</p>
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all mt-4">
              {editingItem ? 'Update Dokumentasi' : 'Upload Dokumentasi'}
            </button>
          </form>
        );
      default:
        return <p className="text-slate-500 text-center py-8">Fitur ini akan segera hadir.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Modal 
        isOpen={modal.open} 
        onClose={() => setModal({ open: false, type: '' })} 
        title={modal.type.charAt(0).toUpperCase() + modal.type.slice(1).replace('-', ' ')}
      >
        {getModalContent()}
      </Modal>
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 lg:relative lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                P
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight">PAKBUIM</h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sistem Terpadu</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                  activeView === item.id 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  activeView === item.id ? "text-blue-600" : "text-slate-400"
                )} />
                {item.label}
                {activeView === item.id && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/admin/100/100" alt="Avatar" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Administrator</p>
                <p className="text-[10px] text-slate-500 font-medium">Biro Umum</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={cn("p-2 hover:bg-slate-100 rounded-lg lg:hidden", isSidebarOpen && "hidden")}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>Sistem</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900 capitalize">{activeView.replace('-', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari data..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-1.5 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
