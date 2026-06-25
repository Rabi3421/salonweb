export default function SettingsFormActions({
  canEdit,
  submitting,
}: {
  canEdit: boolean;
  submitting: boolean;
}) {
  if (!canEdit) {
    return <p className="text-xs text-gray-400">View-only access for your role.</p>;
  }

  return (
    <button
      type="submit"
      disabled={submitting}
      className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60"
    >
      {submitting ? 'Saving...' : 'Save Changes'}
    </button>
  );
}
