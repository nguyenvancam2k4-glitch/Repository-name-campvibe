import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CampHeader from "../components/CampHeader"
import ConfirmModal from "../components/ConfirmModal"
import { useToast } from "../components/ToastProvider"
import { changeUserPassword, deactivateUserAccount, updateUserProfile } from "../services/accountService"
import { getCustomerSession, isCustomerLoggedIn } from "../services/authService"

function AccountSettingsPage() {
  const toast = useToast()
  const navigate = useNavigate()
  const session = getCustomerSession()
  const user = session?.user

  const [profile, setProfile] = useState({ fullName: user?.fullName || "", phone: user?.phone || "", email: user?.email || "" })
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [deletePassword, setDeletePassword] = useState("")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [changing, setChanging] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!isCustomerLoggedIn()) navigate("/login")
  }, [navigate])

  function saveCustomerSession(updatedUser) {
    const next = { ...session, user: { ...session.user, ...updatedUser } }
    localStorage.setItem("campvibe_customer_session", JSON.stringify(next))
  }

  async function handleSaveProfile() {
    try {
      setSaving(true)
      const updated = await updateUserProfile(user.id, { fullName: profile.fullName, phone: profile.phone })
      saveCustomerSession(updated)
      setProfile((prev) => ({ ...prev, fullName: updated.fullName, phone: updated.phone }))
      toast.success("Đã cập nhật hồ sơ", "Thông tin tài khoản đã được lưu.")
    } catch (error) {
      toast.error("Chưa cập nhật được", error.message || "Vui lòng thử lại.")
    } finally {
      setSaving(false)
    }
  }

  async function handleChangePassword() {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Mật khẩu chưa khớp", "Vui lòng nhập lại mật khẩu mới.")
      return
    }

    try {
      setChanging(true)
      await changeUserPassword(user.id, { currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword })
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      toast.success("Đã đổi mật khẩu", "Lần đăng nhập sau hãy dùng mật khẩu mới.")
    } catch (error) {
      toast.error("Chưa đổi được mật khẩu", error.message || "Vui lòng thử lại.")
    } finally {
      setChanging(false)
    }
  }

  async function handleDeactivate() {
    try {
      setDeleting(true)
      await deactivateUserAccount(user.id, deletePassword)
      localStorage.removeItem("campvibe_customer_session")
      toast.success("Tài khoản đã được tạm khóa", "Bạn đã được đăng xuất khỏi CampVibe.")
      navigate("/")
    } catch (error) {
      toast.error("Chưa tạm khóa được", error.message || "Vui lòng thử lại.")
    } finally {
      setDeleting(false)
      setConfirmOpen(false)
    }
  }

  if (!user) return <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">Đang kiểm tra tài khoản...</div>

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-950 text-white">
      <CampHeader />
      <main className="relative px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#34d39922,transparent_34%),radial-gradient(circle_at_bottom_right,#f59e0b17,transparent_34%)]"></div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <section className="py-8">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-emerald-300">Cài đặt tài khoản</p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">Quản lý thông tin cá nhân</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-400">Cập nhật hồ sơ, đổi mật khẩu và quản lý trạng thái tài khoản của bạn.</p>
            <div className="mt-6"><Link to="/account" className="camp-btn camp-btn-secondary px-6 py-3 text-sm">Quay lại tài khoản</Link></div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/20">
              <h2 className="text-2xl font-black">Thông tin hồ sơ</h2>
              <div className="mt-6 grid gap-4">
                <label><span className="text-sm font-black text-stone-300">Họ và tên</span><input value={profile.fullName} onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))} className="mt-2 w-full rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-4 font-bold outline-none focus:border-emerald-300/50" /></label>
                <label><span className="text-sm font-black text-stone-300">Email</span><input value={profile.email} disabled className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 font-bold text-stone-500 outline-none" /></label>
                <label><span className="text-sm font-black text-stone-300">Số điện thoại</span><input value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} className="mt-2 w-full rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-4 font-bold outline-none focus:border-emerald-300/50" /></label>
                <button disabled={saving} onClick={handleSaveProfile} className="camp-btn camp-btn-primary mt-2 px-6 py-4 text-sm">{saving ? "Đang lưu..." : "Lưu hồ sơ"}</button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/20">
              <h2 className="text-2xl font-black">Đổi mật khẩu</h2>
              <div className="mt-6 grid gap-4">
                <label><span className="text-sm font-black text-stone-300">Mật khẩu hiện tại</span><input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))} className="mt-2 w-full rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-4 font-bold outline-none focus:border-emerald-300/50" /></label>
                <label><span className="text-sm font-black text-stone-300">Mật khẩu mới</span><input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))} className="mt-2 w-full rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-4 font-bold outline-none focus:border-emerald-300/50" /></label>
                <label><span className="text-sm font-black text-stone-300">Nhập lại mật khẩu mới</span><input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))} className="mt-2 w-full rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-4 font-bold outline-none focus:border-emerald-300/50" /></label>
                <button disabled={changing} onClick={handleChangePassword} className="camp-btn camp-btn-secondary mt-2 px-6 py-4 text-sm">{changing ? "Đang đổi..." : "Đổi mật khẩu"}</button>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-[2rem] border border-red-300/20 bg-red-400/10 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div><h2 className="text-2xl font-black text-red-100">Tạm khóa tài khoản</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-red-100/75">Tài khoản sẽ bị khóa đăng nhập. Dữ liệu đặt phòng cũ vẫn được giữ để đối chiếu khi cần.</p></div>
              <button onClick={() => setConfirmOpen(true)} className="camp-btn border border-red-300/30 bg-red-400/15 px-6 py-3 text-sm text-red-100 hover:bg-red-400 hover:text-white">Tạm khóa tài khoản</button>
            </div>
          </section>
        </div>
      </main>

      <ConfirmModal open={confirmOpen} title="Tạm khóa tài khoản?" message="Nhập mật khẩu hiện tại để xác nhận. Sau khi tạm khóa, bạn sẽ được đăng xuất." confirmText="Xác nhận tạm khóa" cancelText="Hủy" variant="danger" isLoading={deleting} onConfirm={handleDeactivate} onCancel={() => setConfirmOpen(false)}>
        <input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} placeholder="Nhập mật khẩu hiện tại" className="mt-4 w-full rounded-2xl border border-white/10 bg-stone-950/90 px-4 py-4 font-bold text-white outline-none focus:border-red-300/50" />
      </ConfirmModal>
    </div>
  )
}

export default AccountSettingsPage
