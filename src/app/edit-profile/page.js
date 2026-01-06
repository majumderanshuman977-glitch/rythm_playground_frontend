"use client";
import Link from 'next/link'
import { useEffect, useState, useMemo, useRef } from 'react'
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/authContext"
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import countryList from "react-select-country-list";
import toast from 'react-hot-toast';

function editProfile() {

const { logout } = useAuth();
const [loading, setLoading] = useState(false);
const [preview, setPreview] = useState("../images/profile.png");
const [sideMenuOpen, serSideMenuOpen] = useState(false);
const inputRef = useRef(null);
const router = useRouter();
const [token, setToken] = useState(null);
const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthday: {
      day: "",
      month: "",
      year: "",
    },
    town: "",
    state: "",
    pincode: "",
    country: null, // Changed to null instead of ""
    password: "",
    confirmPassword: "",
  });

  // Generate country list
  const countryOptions = useMemo(() => countryList().getData(), []);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedToken = sessionStorage.getItem("token");
        if (!storedToken) {
          router.push("/login");
          return;
        }
        
        setToken(storedToken);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        
        if (result.success && result.data) {
          const data = result.data;
          
          // Parse DOB (format: "13 Dec 2001")
          let day = "", month = "", year = "";
          if (data.dob) {
            const dobParts = data.dob.split(" ");
            if (dobParts.length === 3) {
              day = parseInt(dobParts[0], 10); 
              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              month = (monthNames.indexOf(dobParts[1]) + 1).toString();
              year = dobParts[2];
            }
          }

          // Find country object for react-select
          const countryObj = countryOptions.find(
            (c) => c.label.toLowerCase() === data.country?.toLowerCase()
          );

          setFormData({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            phone: data.phone || "",
            birthday: { day, month, year },
            town: data.city || "",
            state: data.state || "",
            pincode: data.zip_code || "",
            country: countryObj || null, // ✅ Store the object, not the string
            password: "",
            confirmPassword: "",
          });

          // Set profile image
          if (data.profile_image) {
            setPreview(data.profile_image);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile data");
      }
    };

    fetchProfile();
  }, [router, countryOptions]);

  // Country Change
  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, country: value }));
  };

  // Phone handler
  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  // Birthday handler
  const handleBirthdayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      birthday: {
        ...prev.birthday,
        [field]: value,
      },
    }));
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Dropdown lists
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append("first_name", formData.firstName);
      formDataToSend.append("last_name", formData.lastName);
      formDataToSend.append("phone", formData.phone);
      
      // Format DOB (e.g., "13 Dec 2001")
      if (formData.birthday.day && formData.birthday.month && formData.birthday.year) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[parseInt(formData.birthday.month) - 1];
        const dob = `${formData.birthday.day} ${monthName} ${formData.birthday.year}`;
        formDataToSend.append("dob", dob);
      }
      
      formDataToSend.append("city", formData.town);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("zip_code", formData.pincode);
      formDataToSend.append("country", formData.country?.label || ""); // ✅ Get label from object
      
      // Add password only if provided
      if (formData.password && formData.password.trim() !== "") {
        formDataToSend.append("password", formData.password);
      }
      
      // Add profile image if selected
      if (profileImage) {
        formDataToSend.append("profile_image", profileImage);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}edit-profile`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();
      
      if (result.status === true) {
        toast.success("Profile updated successfully");
        window.dispatchEvent(new Event("auth-change"));
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const openFilePicker = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store the file for upload
    setProfileImage(file);

    // Create preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };



  return (
    <section className='account_details_main'>
          <img className={sideMenuOpen === true ? "prof_lft_bg active_sidemenu" : "prof_lft_bg"} src='../images/dashboard_grp.png' alt='img' />
          <div className='account_details_inner'>
            <div className={sideMenuOpen === true ? "side_menu active_sidemenu" : "side_menu"} onClick={() => serSideMenuOpen(true)}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3V5H3V3H12ZM16 19V21H3V19H16ZM22 11V13H3V11H22Z"></path>
                  </svg></div>
              <div className={sideMenuOpen === true ? "account_details_left active_sidemenu" : "account_details_left"}>
                <div className={sideMenuOpen === true ? "side_menu_inn active_sidemenu" : "side_menu_inn"} onClick={() => serSideMenuOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg></div>
                  <div className='account_details_left_inner'>
                    
                    <div className='account_details_logo'>
                      <img src='../images/logo.png' alt='logo' />
                    </div>
                    <div className='account_details_nav'>
                      <ul>
                        <li className='active_nav'><Link href={'/account-details'}>Account Details <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
                        <li><Link href={'/memberships'}>Memberships <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
                        <li><Link href={'/class-history'}>Class History <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></Link></li>
                      </ul>
                    </div>
                    <div className='account_details_logout'>
                        <button onClick={logout}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path></svg> Logout</button>
                    </div>
                  </div>
              </div>
              <div className='account_details_right'>
                  <div className='account_details_right_all'>
                      <h2>Edit Profile</h2>
                      <div className='account_details_right_profilenmimg'>
                          <div className='edit_profile_main_area'>
                              <form onSubmit={handleSubmit}>
                                 <div className="frm_grp">
                                    <div className="input_feild">
                                    <img src="../images/user.png" alt="img" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    </div>

                                    <div className="input_feild">
                                    <img src="../images/user.png" alt="img" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="input_feild phone_count">
                                    <PhoneInput
                                    country={"au"}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    inputStyle={{ width: "100%", height: "40px" }}
                                    />
                                </div>

                                {/* Birthday */}
                                <div className="birthday_feild">
                                    <h4>Birthday</h4>

                                    <div className="datebirth">
                                    <select
                                        value={formData.birthday.day}
                                        onChange={(e) => handleBirthdayChange("day", e.target.value)}
                                    >
                                        <option value="">Day</option>
                                        {days.map((d) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                        ))}
                                    </select>

                                    <select
                                        value={formData.birthday.month}
                                        onChange={(e) => handleBirthdayChange("month", e.target.value)}
                                    >
                                        <option value="">Month</option>
                                        {months.map((m, i) => (
                                        <option key={m} value={i + 1}>
                                            {m}
                                        </option>
                                        ))}
                                    </select>

                                    <select
                                        value={formData.birthday.year}
                                        onChange={(e) => handleBirthdayChange("year", e.target.value)}
                                    >
                                        <option value="">Year</option>
                                        {years.map((y) => (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                        ))}
                                    </select>
                                    </div>
                                </div>

                                {/* Town / State */}
                                <div className="frm_grp">
                                    <div className="input_feild">
                                    <img src="../images/map.png" alt="img" />
                                    <input
                                        type="text"
                                        name="town"
                                        placeholder="Town/City"
                                        value={formData.town}
                                        onChange={handleChange}
                                    />
                                    </div>

                                    <div className="input_feild">
                                    <img src="../images/map.png" alt="img" />
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                    </div>
                                </div>

                                {/* Pincode + Country */}
                                <div className="frm_grp">
                                    <div className="input_feild">
                                    <img src="../images/map.png" alt="img" />
                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="Pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                    />
                                    </div>

                                    <div className="input_feild">
                                    <Select
                                        options={countryOptions}
                                        value={formData.country}
                                        onChange={handleCountryChange}
                                        placeholder="Select Country"
                                    />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="frm_grp">
                                    <div className="input_feild">
                                    <img src="../images/lock2.png" alt="img" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password (Leave blank to keep current)"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    </div>

                                    <div className="input_feild">
                                    <img src="../images/lock2.png" alt="img" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    </div>
                                </div>
                                <div className='update_profile_pic'>
                                    <div className="profile-container">
                                        <h3>Update Profile Image</h3>
                                        {/* Profile Image */}
                                        <div className="profile-img" onClick={openFilePicker}>
                                            <img src={preview} alt="Profile" />
                                            <span className="edit">Change</span>
                                        </div>

                                        {/* Hidden File Input */}
                                        <input
                                            ref={inputRef}
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={handleImageChange}
                                        />

                                        </div>
                                </div>


                                <div className='update_prof_btn'>
                                    <button type="submit" disabled={loading}>
                                      {loading ? "Updating..." : "Update Profile"}
                                    </button>
                                </div>


                              </form> 
                          </div>
                      </div>
                     
                  </div>
              </div>
          </div>
      </section>
  )
}

export default editProfile;