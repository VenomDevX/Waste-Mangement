import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pickup-schedule.css";

const PRICING_RATES = {
  small: { base: 50, convenience: 10 },
  medium: { base: 100, convenience: 15 },
  large: { base: 200, convenience: 25 }
};

export function SchedulePickup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    pickupType: "residential",
    address: "",
    pincode: "",
    city: "",
    contactName: "",
    contactPhone: "",
    wasteTypes: [] as string[],
    quantity: "small",
    specialInstructions: "",
    pickupDate: "",
    timeSlot: "",
    frequency: "one-time",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleWasteTypeToggle = (type: string) => {
    setFormData(prev => {
      const types = prev.wasteTypes.includes(type)
        ? prev.wasteTypes.filter(t => t !== type)
        : [...prev.wasteTypes, type];
      setErrors(prevErrors => ({ ...prevErrors, wasteTypes: false }));
      return { ...prev, wasteTypes: types };
    });
  };

  const validateStep = (step: number) => {
    let isValid = true;
    const newErrors: Record<string, boolean> = {};

    if (step === 1) {
      if (!formData.address.trim()) { newErrors.address = true; isValid = false; }
      if (!formData.pincode.trim()) { newErrors.pincode = true; isValid = false; }
      if (!formData.city.trim()) { newErrors.city = true; isValid = false; }
      if (!formData.contactName.trim()) { newErrors.contactName = true; isValid = false; }
      if (!formData.contactPhone.trim()) { newErrors.contactPhone = true; isValid = false; }
    } else if (step === 2) {
      if (formData.wasteTypes.length === 0) {
        newErrors.wasteTypes = true;
        isValid = false;
        alert("Please select at least one waste type.");
      }
    } else if (step === 3) {
      if (!formData.pickupDate) { newErrors.pickupDate = true; isValid = false; }
      if (!formData.timeSlot) { newErrors.timeSlot = true; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      setBookingId(`WW-${new Date().getFullYear()}-${String(timestamp).slice(-6)}${random}`);
      setIsModalOpen(true);
    }, 2000);
  };

  // Pricing
  const rates = PRICING_RATES[formData.quantity as keyof typeof PRICING_RATES] || PRICING_RATES.small;
  const totalAmount = rates.base + rates.convenience;

  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  // Min date
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMinDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  return (
    <main className="pickup-page">
      <section className="pickup-header">
        <div className="header-text">
          <h1>Schedule Waste Pickup</h1>
          <p>Book a convenient time for waste collection from your doorstep. Our certified waste management partners ensure proper handling and disposal.</p>
        </div>
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="stat-icon">🚛</div>
            <div className="stat-number">2,847</div>
            <div className="stat-label">Pickups Today</div>
          </div>
          <div className="kpi-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-number">98.5%</div>
            <div className="stat-label">On-Time Rate</div>
          </div>
          <div className="kpi-card">
            <div className="stat-icon">♻️</div>
            <div className="stat-number">156</div>
            <div className="stat-label">Tonnes Collected</div>
          </div>
        </div>
      </section>

      <section className="pickup-layout">
        <form className="pickup-form-card" id="pickup-form" onSubmit={submitForm}>
          
          {/* Step 1: Location Details */}
          <div className={`form-step ${currentStep === 1 ? 'active' : ''}`} data-step="1">
            <div className="step-header">
              <div className="step-indicator">1</div>
              <div className="step-content">
                <h3>Location Details</h3>
                <p>Where should we collect the waste?</p>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Pickup Type</label>
              <div className="form-grid">
                {[
                  { id: 'residential', icon: '🏠', title: 'Residential', desc: 'Home pickup service' },
                  { id: 'commercial', icon: '🏢', title: 'Commercial', desc: 'Business/office pickup' },
                  { id: 'community', icon: '🏘️', title: 'Community', desc: 'Society/apartment complex', className: 'full-width' }
                ].map(type => (
                  <label key={type.id} className={`radio-option ${type.className || ''}`}>
                    <input 
                      type="radio" 
                      name="pickup-type" 
                      checked={formData.pickupType === type.id}
                      onChange={() => updateFormData('pickupType', type.id)}
                    />
                    <span className="radio-custom"></span>
                    <div className="radio-content">
                      <span className="radio-title">{type.icon} {type.title}</span>
                      <span className="radio-desc">{type.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="address">Complete Address *</label>
                <textarea 
                  id="address" 
                  style={{ borderColor: errors.address ? '#dc2626' : undefined }}
                  placeholder="Enter your complete address including landmarks" 
                  rows={3}
                  value={formData.address}
                  onChange={e => updateFormData('address', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">PIN Code *</label>
                <input 
                  type="text" 
                  id="pincode" 
                  style={{ borderColor: errors.pincode ? '#dc2626' : undefined }}
                  placeholder="Enter 6-digit PIN code" 
                  value={formData.pincode}
                  onChange={e => updateFormData('pincode', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input 
                  type="text" 
                  id="city" 
                  style={{ borderColor: errors.city ? '#dc2626' : undefined }}
                  placeholder="Enter city name" 
                  value={formData.city}
                  onChange={e => updateFormData('city', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-name">Full Name *</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  style={{ borderColor: errors.contactName ? '#dc2626' : undefined }}
                  placeholder="Full Name" 
                  value={formData.contactName}
                  onChange={e => updateFormData('contactName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="contact-phone" 
                  style={{ borderColor: errors.contactPhone ? '#dc2626' : undefined }}
                  placeholder="Phone Number" 
                  value={formData.contactPhone}
                  onChange={e => updateFormData('contactPhone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Step 2: Waste Details */}
          <div className={`form-step ${currentStep === 2 ? 'active' : ''}`} data-step="2">
            <div className="step-header">
              <div className="step-indicator">2</div>
              <div className="step-content">
                <h3>Waste Details</h3>
                <p>What type of waste needs to be collected?</p>
              </div>
            </div>

            <div className="form-group">
              <label>Waste Categories *</label>
              <div className="checkbox-grid">
                {[
                  { id: 'wet-waste', icon: '🥬', title: 'Wet Waste', desc: 'Kitchen scraps, food waste' },
                  { id: 'dry-waste', icon: '📄', title: 'Dry Waste', desc: 'Paper, plastic, metal' },
                  { id: 'e-waste', icon: '💻', title: 'E-Waste', desc: 'Electronics, batteries' },
                  { id: 'hazardous', icon: '⚠️', title: 'Hazardous', desc: 'Chemicals, medical waste' },
                  { id: 'construction', icon: '🧱', title: 'Construction', desc: 'Debris, renovation waste' },
                  { id: 'garden', icon: '🌿', title: 'Garden Waste', desc: 'Leaves, branches, grass' },
                ].map(waste => (
                  <label key={waste.id} className="checkbox-card">
                    <input 
                      type="checkbox" 
                      checked={formData.wasteTypes.includes(waste.id)}
                      onChange={() => handleWasteTypeToggle(waste.id)}
                    />
                    <div className="checkbox-content">
                      <div className="checkbox-icon">{waste.icon}</div>
                      <div className="checkbox-title">{waste.title}</div>
                      <div className="checkbox-desc">{waste.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Estimated Quantity</label>
              <div className="quantity-selector">
                {[
                  { id: 'small', icon: '🛍️', title: 'Small', desc: '1-2 bags' },
                  { id: 'medium', icon: '🗑️', title: 'Medium', desc: '3-5 bags' },
                  { id: 'large', icon: '🚛', title: 'Large', desc: '6+ bags' }
                ].map(qty => (
                  <label key={qty.id} className="quantity-option">
                    <input 
                      type="radio" 
                      name="quantity" 
                      checked={formData.quantity === qty.id}
                      onChange={() => updateFormData('quantity', qty.id)}
                    />
                    <span className="quantity-card">
                      <span className="quantity-icon">{qty.icon}</span>
                      <span className="quantity-title">{qty.title}</span>
                      <span className="quantity-desc">{qty.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="special-instructions">Special Instructions</label>
              <textarea 
                id="special-instructions" 
                placeholder="Any specific handling requirements or additional notes" 
                rows={3}
                value={formData.specialInstructions}
                onChange={e => updateFormData('specialInstructions', e.target.value)}
              />
            </div>
          </div>

          {/* Step 3: Schedule */}
          <div className={`form-step ${currentStep === 3 ? 'active' : ''}`} data-step="3">
            <div className="step-header">
              <div className="step-indicator">3</div>
              <div className="step-content">
                <h3>Schedule Pickup</h3>
                <p>Choose your preferred date and time</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="pickup-date">Pickup Date *</label>
                <input 
                  type="date" 
                  id="pickup-date" 
                  style={{ borderColor: errors.pickupDate ? '#dc2626' : undefined }}
                  min={minDate}
                  value={formData.pickupDate}
                  onChange={e => updateFormData('pickupDate', e.target.value)}
                />
              </div>
              
              <div className="form-group full-width">
                <label>Preferred Time Slot *</label>
                <div className="time-slots">
                  {[
                    { id: 'morning', icon: '🌅', title: 'Morning', time: '6AM - 10AM' },
                    { id: 'afternoon', icon: '☀️', title: 'Afternoon', time: '10AM - 2PM' },
                    { id: 'evening', icon: '🌆', title: 'Evening', time: '2PM - 6PM' }
                  ].map(slot => (
                    <label key={slot.id} className="time-slot">
                      <input 
                        type="radio" 
                        name="time-slot" 
                        checked={formData.timeSlot === slot.id}
                        onChange={() => updateFormData('timeSlot', slot.id)}
                      />
                      <span className="slot-card" style={{ borderColor: errors.timeSlot ? '#dc2626' : undefined }}>
                        <span className="slot-icon">{slot.icon}</span>
                        <span className="slot-title">{slot.title}</span>
                        <span className="slot-time">{slot.time}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Pickup Frequency</label>
                <div className="frequency-options">
                  {[
                    { id: 'one-time', title: 'One-time', desc: 'Single pickup' },
                    { id: 'weekly', title: 'Weekly', desc: 'Every week' },
                    { id: 'bi-weekly', title: 'Bi-weekly', desc: 'Every 2 weeks' },
                    { id: 'monthly', title: 'Monthly', desc: 'Once a month' }
                  ].map(freq => (
                    <label key={freq.id} className="frequency-option">
                      <input 
                        type="radio" 
                        name="frequency" 
                        checked={formData.frequency === freq.id}
                        onChange={() => updateFormData('frequency', freq.id)}
                      />
                      <span className="frequency-card">
                        <span className="frequency-title">{freq.title}</span>
                        <span className="frequency-desc">{freq.desc}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-navigation">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={prevStep}
              style={{ display: currentStep === 1 ? 'none' : 'inline-flex' }}
            >
              ← Previous
            </button>
            <button 
              type="button" 
              className="btn btn-primary ml-auto" 
              onClick={nextStep}
              style={{ display: currentStep === 3 ? 'none' : 'inline-flex' }}
            >
              Next →
            </button>
            <button 
              type="submit" 
              className={`btn btn-primary ml-auto ${isLoading ? 'loading' : ''}`} 
              disabled={isLoading}
              style={{ display: currentStep === 3 ? 'inline-flex' : 'none' }}
            >
              {isLoading ? 'Processing...' : 'Schedule Pickup'}
            </button>
          </div>
        </form>

        <aside className="pickup-summary-card">
          <div className="summary-header">
            <h3>Pickup Summary</h3>
            <span className="summary-status">Draft</span>
          </div>

          <div className="summary-content" id="summary-content">
            {(!formData.address && formData.wasteTypes.length === 0 && !formData.pickupDate) ? (
              <div className="summary-empty">
                <div className="empty-icon">📋</div>
                <p>Fill out the form to see your pickup summary</p>
              </div>
            ) : (
              <div className="summary-details">
                {formData.pickupType && (
                  <div className="detail-item">
                    <span className="detail-label">Pickup Type</span>
                    <span className="detail-value capitalize">{formData.pickupType}</span>
                  </div>
                )}
                {formData.address && (
                  <div className="detail-item">
                    <span className="detail-label">Address</span>
                    <span className="detail-value">{formData.address.substring(0, 50)}{formData.address.length > 50 ? '...' : ''}</span>
                  </div>
                )}
                {formData.contactName && (
                  <div className="detail-item">
                    <span className="detail-label">Contact</span>
                    <span className="detail-value">{formData.contactName}</span>
                  </div>
                )}
                {formData.wasteTypes.length > 0 && (
                  <div className="detail-item">
                    <span className="detail-label">Waste Types</span>
                    <span className="detail-value capitalize">{formData.wasteTypes.join(', ').replace(/-/g, ' ')}</span>
                  </div>
                )}
                {formData.quantity && (
                  <div className="detail-item">
                    <span className="detail-label">Quantity</span>
                    <span className="detail-value capitalize">{formData.quantity}</span>
                  </div>
                )}
                {formData.pickupDate && (
                  <div className="detail-item">
                    <span className="detail-label">Pickup Date</span>
                    <span className="detail-value">{formatDate(formData.pickupDate)}</span>
                  </div>
                )}
                {formData.timeSlot && (
                  <div className="detail-item">
                    <span className="detail-label">Time Slot</span>
                    <span className="detail-value capitalize">{formData.timeSlot}</span>
                  </div>
                )}
                {formData.frequency && (
                  <div className="detail-item">
                    <span className="detail-label">Frequency</span>
                    <span className="detail-value capitalize">{formData.frequency.replace('-', ' ')}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="summary-footer">
            <div className="pricing-info">
              <div className="price-row">
                <span>Service Charge</span>
                <span>₹{rates.base}</span>
              </div>
              <div className="price-row">
                <span>Convenience Fee</span>
                <span>₹{rates.convenience}</span>
              </div>
              <div className="price-divider"></div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="guidelines-card">
            <h4>Service Guidelines</h4>
            <ul className="guidelines-list">
              <li><span className="guideline-icon">✅</span><span>Segregate waste properly before pickup</span></li>
              <li><span className="guideline-icon">📞</span><span>Our team will call 30 mins before arrival</span></li>
              <li><span className="guideline-icon">🕐</span><span>Please be available during the time slot</span></li>
              <li><span className="guideline-icon">♻️</span><span>Receive digital certificate</span></li>
              <li><span className="guideline-icon">💰</span><span>Pay online or cash on pickup</span></li>
            </ul>
          </div>
        </aside>
      </section>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="success-icon">✅</div>
              <h3>Pickup Scheduled Successfully!</h3>
              <p style={{ color: '#64748b', marginTop: '8px' }}>Your waste pickup has been scheduled. You'll receive a confirmation SMS shortly.</p>
            </div>
            
            <div className="modal-body">
              <div className="confirmation-details">
                <div className="summary-details">
                  <div className="detail-item">
                    <span className="detail-label">Booking ID:</span>
                    <span className="detail-value">{bookingId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Pickup Date:</span>
                    <span className="detail-value">{formatDate(formData.pickupDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Time Slot:</span>
                    <span className="detail-value capitalize">{formData.timeSlot}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Estimated Cost:</span>
                    <span className="detail-value" style={{ color: '#0aa844' }}>₹{totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setIsModalOpen(false); navigate('/'); }}>Back to Home</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
