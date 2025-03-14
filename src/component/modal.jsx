import { useState, useRef, useEffect } from 'react';
import './modal.css';

function Modal() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ username: "", email: "", phone: "", dob: "" });
    const modalRef = useRef(null);

    // Close modal if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    // Ensure modal is removed from the DOM when closed
    const handleClose = () => {
        setOpen(false);
    };

    // Validate phone and date of birth
    const isValidForm = () => {
        if (form.phone.length !== 10) return alert("Enter a valid 10-digit phone number."), false;

        const dob = new Date(form.dob);
        if (isNaN(dob) || dob > new Date()) return alert("Enter a valid date of birth."), false;

        return true;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValidForm()) return;

        setForm({ username: "", email: "", phone: "", dob: "" });
        setOpen(false);
    };

    // Handle input changes
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <>
            <div className="container">
                <h1>User Details Modal</h1>
                <button onClick={() => setOpen(true)}>Open Form</button>
            </div>
            {open && (
                <div className="modal" onClick={handleClose}>
                    <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                        <h3>Fill Details</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Username: </label>
                            <input type="text" name="username" onChange={handleChange} value={form.username} required />
                            <br />
                            <label>Email Address: </label>
                            <input type="email" name="email" onChange={handleChange} value={form.email} required />
                            <br />
                            <label>Phone Number: </label>
                            <input type="tel" name="phone" onChange={handleChange} value={form.phone} required />
                            <br />
                            <label>Date of Birth: </label>
                            <input type="date" name="dob" onChange={handleChange} value={form.dob} required />
                            <br />
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
