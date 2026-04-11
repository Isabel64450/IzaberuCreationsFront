import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import abyssin from '../../images/Abyssin.png'
import '../../styles/formulaires.css'
import axiosInstance from '../../api/axiosInstance.js'
const registrationForm = () => {
    const [form, setForm]=useState({
        userName:'',
        userLastName:'',
        userEmail:'',
        password:'',
        confirmPassword: '',
        number:'',
        street:'',
        complement:'',
        city:'',
        postalCode:''
    })
const navigate = useNavigate()
const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
}
const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    return alert("Les mots de passe ne correspondent pas.");
  }

  const dataToSend = {
  userName: form.userName,
  userLastName: form.userLastName,
  userEmail: form.userEmail,
  password: form.password,
  confirmPassword: form.confirmPassword, 
  number: form.number,
  street: form.street,
  complement: form.complement,
  city: form.city,
  postalCode: form.postalCode
};
console.log("Form complet :", form);
console.log("Données envoyées :", dataToSend);
  
  try {
    console.log("Form data envoyée :", dataToSend);

    const res = await axiosInstance.post('users/register', dataToSend);
    alert(res.data.message);
    navigate('/login');
  } catch (err) {
    console.error('Erreur détaillée axios:', err);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    }
    alert('Erreur lors de l’inscription');
  }
};

    return(
    <div className="registration-container">
      <div className="form-box">
        <div className="left-side">
          <div className="upload-photo">
            <div className="circle">
              <i className="fa-regular fa-circle-user"></i>
            </div>
          </div>
          <p className="description"></p>
          <div className="illustration">
            <div className="books">
              <img
                src={abyssin}
                alt="watercolor d'un jolie chat roux"
              />
            </div>
          </div>
        </div>
        <div className="right-side">
          <h1>Compte clients</h1>
          <form onSubmit={handleSubmit}>
            <div className="name-row">
              <input type="text" name="userName" placeholder="Prenom" value={form.userName} onChange={handleChange} />
              <input type="text" name="userLastName" placeholder="Nom" value={form.userLastName} onChange={handleChange} />
              <input type="email" name="userEmail" placeholder="Email" value={form.userEmail} onChange={handleChange} />
              <input type="password" name="password" placeholder="mot de pass" value={form.password} onChange={handleChange}/>
            <input type="password" name="confirmPassword" placeholder="Confirmer mot de pass" value={form.confirmPassword} onChange={handleChange}/>
            </div>
            <h2>Adresse du client</h2>
            <input type="text" name="number" placeholder="numero" value={form.number} onChange={handleChange} />
            <input type="text" name="street" placeholder="Rue" value={form.street} onChange={handleChange}/>
            <input type="text" name="complement" placeholder="Complement d'adress" value={form.complement} onChange={handleChange} />
            <input type="text" name="city" placeholder="Ville" value={form.city} onChange={handleChange} />
            <input type="number"name="postalCode" placeholder="Code Postal" value={form.postalCode} onChange={handleChange}/>
            <div className="bouttons-rows">
              <button type="submit">envoyer</button>
              <button type="button" onClick={()=>navigate('/')}>Retour à l'Accueil</button>
            </div>
          </form>
        </div>
      </div>
    </div>
)

}
export default registrationForm