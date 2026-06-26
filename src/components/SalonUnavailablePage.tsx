type BlockedContact = {
  phone: string;
  email: string;
  address: string;
} | null;

export function SalonUnavailablePage({
  message,
  salonName,
  contact,
}: {
  message?: string;
  salonName?: string;
  contact?: BlockedContact;
}) {
  const phone = contact?.phone;
  const email = contact?.email;
  const address = contact?.address;
  const hasContact = phone || email;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-slate-200">
          <svg
            className="size-10 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          {salonName ? `${salonName}` : "Salon"} Unavailable
        </h1>

        <p className="mt-3 text-base leading-relaxed text-slate-500">
          {message || "This salon is temporarily unavailable. Please check back later or contact support."}
        </p>

        {hasContact ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white px-6 py-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact the salon</p>
            <div className="mt-3 space-y-3">
              {phone ? (
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-3 text-sm text-slate-700 transition hover:text-indigo-600"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{phone}</span>
                </a>
              ) : null}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-slate-700 transition hover:text-indigo-600"
                >
                  <svg className="size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>{email}</span>
                </a>
              ) : null}
              {address ? (
                <div className="flex items-start gap-3 text-sm text-slate-500">
                  <svg className="mt-0.5 size-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{address}</span>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-500">
            If you believe this is an error, please contact the salon owner or support team.
          </div>
        )}
      </div>
    </div>
  );
}
