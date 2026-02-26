import { useState, useEffect } from "react";
import type {
  Vehicle,
  CheckItem,
  CheckItemKey,
  CheckItemStatus,
  ErrorResponse,
} from "./types";
import { api } from "./api";

const CHECK_ITEMS: CheckItemKey[] = [
  "TYRES",
  "BRAKES",
  "LIGHTS",
  "OIL",
  "COOLANT",
];

interface Props {
  onSuccess: () => void;
}

export function CheckForm({ onSuccess }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [odometerKm, setOdometerKm] = useState("");
  const [note, setNote] = useState("");
  const [items, setItems] = useState<CheckItem[]>(
    CHECK_ITEMS.map((key) => ({ key, status: "OK" })),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    api.getVehicles().then(setVehicles).catch(console.error);
  }, []);

  const handleItemStatusChange = (key: CheckItemKey, status: CheckItemStatus) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status } : item,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors([]);
    setLoading(true);

    try {
      await api.createCheck({
        vehicleId: selectedVehicle,
        odometerKm: parseFloat(odometerKm),
        items,
        note: note.trim() ? note.trim() : undefined,
      });

      // Reset form and display success notification
      setSelectedVehicle("");
      setOdometerKm("");
      setNote("");
      setItems(CHECK_ITEMS.map((key) => ({ key, status: "OK" })));
      onSuccess();
    } catch (err: unknown) {
      const errorResponse = err as ErrorResponse;
      if (errorResponse.error?.details) {
        setValidationErrors(
          errorResponse.error.details.map((d) => `${d.field}: ${d.reason}`),
        );
      } else {
        setError("Failed to submit check. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="check-form">
      <h2>Submit Vehicle Inspection Result</h2>

      {error && <div className="error-banner">{error}</div>}
      {validationErrors.length > 0 && (
        <div className="error-banner">
          <strong>Validation errors:</strong>
          <ul>
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="vehicle">Vehicle *</label>
        <select
          id="vehicle"
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
          required
        >
          <option value="">Select a vehicle</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.registration} - {v.make} {v.model} ({v.year})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="odometer">Odometer (km) *</label>
        <input
          id="odometer"
          type="text"
          value={odometerKm}
          onChange={(e) => setOdometerKm(e.target.value)}
          placeholder="Enter odometer reading"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="note">Notes (Optional)</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add any additional inspection notes..."
          maxLength={300}
          rows={4}
        />
        <small>{note.length}/300</small>
      </div>

      <div className="form-group">
        <label>Checklist Items *</label>
        <p className="checklist-helper">Checked means OK. Unchecked means FAIL.</p>
        <div className="checklist">
          {items.map((item) => (
            <div key={item.key} className="checklist-item">
              <label className="item-label" htmlFor={`item-${item.key}`}>
                {item.key}
              </label>
              <div className="checklist-item-control">
                <span
                  className={`checklist-status ${item.status === "OK" ? "ok" : "fail"}`}
                >
                  {item.status}
                </span>
                <input
                  id={`item-${item.key}`}
                  className="checklist-checkbox"
                  type="checkbox"
                  checked={item.status === "OK"}
                  onChange={(e) =>
                    handleItemStatusChange(
                      item.key,
                      e.target.checked ? "OK" : "FAIL",
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Check"}
      </button>
    </form>
  );
}
