import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useValidateInvite, useCompleteInvite } from "@/hooks/UseInviteOnboard";
import { useForm } from "react-hook-form";

type FormValues = {
  fullName: string;
  password: string;
  phoneNumber?: string;
  bio?: string;
};

const CoordinatorOnboardPage: React.FC = () => {
  const [search] = useSearchParams();
  const token = search.get("token") || undefined;
  const { data, isLoading } = useValidateInvite(token);
  const complete = useCompleteInvite();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    if (!token) return;
    complete.mutate({ token, ...values }, {
      onSuccess: () => {
        navigate("/login");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-lg w-full bg-white shadow rounded p-6">
        <h2 className="text-2xl font-semibold mb-4">Coordinator Onboarding</h2>

        {isLoading ? (
          <p>Validating invite...</p>
        ) : data?.success === false ? (
          <p className="text-red-500">Invalid or expired invite token.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                readOnly
                value={data?.data?.email || ""}
                className="mt-1 block w-full rounded border px-3 py-2 bg-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Full name</label>
              <input {...register("fullName", { required: true })} className="mt-1 block w-full rounded border px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input type="password" {...register("password", { required: true })} className="mt-1 block w-full rounded border px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Phone number (optional)</label>
              <input {...register("phoneNumber")} className="mt-1 block w-full rounded border px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Short bio (optional)</label>
              <textarea {...register("bio")} className="mt-1 block w-full rounded border px-3 py-2" />
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={(complete as any).isPending}>
                {(complete as any).isPending ? "Submitting..." : "Complete Onboarding"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CoordinatorOnboardPage;
