"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner" // optional for success/error notification
import { ProfileStatus, User } from "@prisma/client"

export function ApproveButton({ user, onApprove }: { user: User, onApprove?: (user: User) => void }) {
    const [isApproving, setIsApproving] = useState(false)

    const onApproveUser = async () => {
        setIsApproving(true)

        try {
            const res = await fetch("/api/admin/approve-user", {
                method: "POST",
                body: JSON.stringify({
                    id: user.id,
                    action: "APPROVED",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!res.ok) {
                throw new Error("Failed to approve user")
            }
            onApprove?.({ ...user, profileStatus: ProfileStatus.APPROVED })
            toast.success("User approved successfully")
            // Optionally refetch data or update local state
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong while approving")
        } finally {
            setIsApproving(false)
        }
    }

    if (user?.profileStatus === ProfileStatus.APPROVED) return null

    return (
        <Button variant="gradient" onClick={onApproveUser} disabled={isApproving} className="w-full">
            {isApproving ? "Approving..." : "Approve Now"}
        </Button>
    )
}
