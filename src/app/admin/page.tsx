import { redirect } from "next/navigation";

export default function AdminPage() {
    redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/`);
}