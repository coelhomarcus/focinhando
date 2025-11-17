import { useState, useEffect } from 'react'
import { useApi } from '@/hooks/useApi'

interface Contact {
   id: string
   fullName: string
   email: string
   phoneNumber: string
   subject: string
   message: string
   createdAt: string
}

const Admin = () => {
   const { apiBaseUrl } = useApi()
   const [activeTab, setActiveTab] = useState<'contacts' | 'pets' | 'publications'>('contacts')
   const [contacts, setContacts] = useState<Contact[]>([])
   const [loading, setLoading] = useState(false)
   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

   // Pet Form State
   const [petForm, setPetForm] = useState({
      name: '',
      img: '',
      age: '',
      city: '',
      state: '',
      sex: 'macho',
      vaccinated: false,
      about: '',
      specie: 'cão',
      race: '',
      weight: 0,
      userComplementId: ''
   })

   // Publication Form State
   const [publicationForm, setPublicationForm] = useState({
      title: '',
      topic: '',
      img: '',
      text: ''
   })

   useEffect(() => {
      if (activeTab === 'contacts') {
         loadContacts()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [activeTab])

   const loadContacts = async () => {
      setLoading(true)
      try {
         const token = localStorage.getItem('authToken')
         const response = await fetch(`${apiBaseUrl}/contact/all-contacts`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         const data = await response.json()

         if (!data.error) {
            setContacts(data.contacts || [])
         } else {
            console.error('Erro ao carregar contatos:', data.error)
         }
      } catch (error) {
         console.error('Erro ao conectar com o servidor:', error)
      } finally {
         setLoading(false)
      }
   }

   const handlePetSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setSubmitStatus('idle')

      try {
         const token = localStorage.getItem('authToken')
         const response = await fetch(`${apiBaseUrl}/pets/register`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
               ...petForm,
               weight: Number(petForm.weight)
            })
         })

         const data = await response.json()

         if (data.error) {
            setSubmitStatus('error')
            console.error('Erro ao cadastrar pet:', data.error)
         } else {
            setSubmitStatus('success')
            setPetForm({
               name: '',
               img: '',
               age: '',
               city: '',
               state: '',
               sex: 'macho',
               vaccinated: false,
               about: '',
               specie: 'cão',
               race: '',
               weight: 0,
               userComplementId: ''
            })
         }
      } catch (error) {
         console.error('Erro ao conectar com o servidor:', error)
         setSubmitStatus('error')
      } finally {
         setLoading(false)
         setTimeout(() => setSubmitStatus('idle'), 3000)
      }
   }

   const handlePublicationSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setSubmitStatus('idle')

      try {
         const token = localStorage.getItem('authToken')
         const response = await fetch(`${apiBaseUrl}/publication/register`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(publicationForm)
         })

         const data = await response.json()

         if (data.error) {
            setSubmitStatus('error')
            console.error('Erro ao cadastrar publicação:', data.error)
         } else {
            setSubmitStatus('success')
            setPublicationForm({
               title: '',
               topic: '',
               img: '',
               text: ''
            })
         }
      } catch (error) {
         console.error('Erro ao conectar com o servidor:', error)
         setSubmitStatus('error')
      } finally {
         setLoading(false)
         setTimeout(() => setSubmitStatus('idle'), 3000)
      }
   }

   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleString('pt-BR')
   }

   return (
      <div className='min-h-screen bg-focinhando-gray py-10'>
         <div className='container mx-auto px-5'>
            <h1 className='text-5xl font-bold mb-8 text-focinhando-dark'>Painel Administrativo</h1>

            {/* Tabs */}
            <div className='flex gap-4 mb-8 border-b-2 border-focinhando-border'>
               <button
                  onClick={() => setActiveTab('contacts')}
                  className={`px-6 py-3 font-semibold transition ${activeTab === 'contacts'
                        ? 'text-focinhando-accent border-b-4 border-focinhando-accent'
                        : 'text-focinhando-text hover:text-focinhando-accent'
                     }`}
               >
                  📧 Contatos
               </button>
               <button
                  onClick={() => setActiveTab('pets')}
                  className={`px-6 py-3 font-semibold transition ${activeTab === 'pets'
                        ? 'text-focinhando-accent border-b-4 border-focinhando-accent'
                        : 'text-focinhando-text hover:text-focinhando-accent'
                     }`}
               >
                  🐾 Cadastrar Pet
               </button>
               <button
                  onClick={() => setActiveTab('publications')}
                  className={`px-6 py-3 font-semibold transition ${activeTab === 'publications'
                        ? 'text-focinhando-accent border-b-4 border-focinhando-accent'
                        : 'text-focinhando-text hover:text-focinhando-accent'
                     }`}
               >
                  📝 Nova Publicação
               </button>
            </div>

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
               <div className='bg-white rounded-3xl p-8 shadow-lg'>
                  <h2 className='text-3xl font-bold mb-6 text-focinhando-dark'>Mensagens de Contato</h2>

                  {loading ? (
                     <div className='text-center py-10'>
                        <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-focinhando-accent border-t-transparent'></div>
                     </div>
                  ) : contacts.length === 0 ? (
                     <p className='text-center text-focinhando-text py-10'>Nenhum contato encontrado.</p>
                  ) : (
                     <div className='space-y-4'>
                        {contacts.map((contact) => (
                           <div key={contact.id} className='border-2 border-focinhando-border rounded-2xl p-6 hover:shadow-md transition'>
                              <div className='flex justify-between items-start mb-4'>
                                 <div>
                                    <h3 className='text-xl font-bold text-focinhando-dark'>{contact.fullName}</h3>
                                    <p className='text-sm text-focinhando-text'>{contact.email}</p>
                                    {contact.phoneNumber && (
                                       <p className='text-sm text-focinhando-text'>{contact.phoneNumber}</p>
                                    )}
                                 </div>
                                 <span className='text-xs text-gray-500'>{formatDate(contact.createdAt)}</span>
                              </div>
                              <div className='mb-3'>
                                 <span className='inline-block bg-focinhando-accent text-white px-3 py-1 rounded-full text-sm font-semibold'>
                                    {contact.subject}
                                 </span>
                              </div>
                              <p className='text-focinhando-text whitespace-pre-line'>{contact.message}</p>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            )}

            {/* Pets Tab */}
            {activeTab === 'pets' && (
               <div className='bg-white rounded-3xl p-8 shadow-lg'>
                  <h2 className='text-3xl font-bold mb-6 text-focinhando-dark'>Cadastrar Novo Pet</h2>

                  <form onSubmit={handlePetSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Nome</label>
                        <input
                           type='text'
                           value={petForm.name}
                           onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                           required
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Imagem (nome do arquivo)</label>
                        <input
                           type='text'
                           value={petForm.img}
                           onChange={(e) => setPetForm({ ...petForm, img: e.target.value })}
                           required
                           placeholder='exemplo.jpg'
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Data de Nascimento</label>
                        <input
                           type='date'
                           value={petForm.age}
                           onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                           required
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Cidade</label>
                        <input
                           type='text'
                           value={petForm.city}
                           onChange={(e) => setPetForm({ ...petForm, city: e.target.value })}
                           required
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Estado</label>
                        <input
                           type='text'
                           value={petForm.state}
                           onChange={(e) => setPetForm({ ...petForm, state: e.target.value })}
                           required
                           maxLength={2}
                           placeholder='PA'
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Sexo</label>
                        <select
                           value={petForm.sex}
                           onChange={(e) => setPetForm({ ...petForm, sex: e.target.value })}
                           required
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition bg-white'
                        >
                           <option value='macho'>Macho</option>
                           <option value='fêmea'>Fêmea</option>
                        </select>
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Espécie</label>
                        <select
                           value={petForm.specie}
                           onChange={(e) => setPetForm({ ...petForm, specie: e.target.value })}
                           required
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition bg-white'
                        >
                           <option value='cão'>Cão</option>
                           <option value='gato'>Gato</option>
                        </select>
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Raça</label>
                        <input
                           type='text'
                           value={petForm.race}
                           onChange={(e) => setPetForm({ ...petForm, race: e.target.value })}
                           required
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Peso (kg)</label>
                        <input
                           type='number'
                           value={petForm.weight}
                           onChange={(e) => setPetForm({ ...petForm, weight: Number(e.target.value) })}
                           required
                           min='0'
                           step='0.1'
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>ID do Complemento do Usuário</label>
                        <input
                           type='text'
                           value={petForm.userComplementId}
                           onChange={(e) => setPetForm({ ...petForm, userComplementId: e.target.value })}
                           required
                           placeholder='UUID do usuário'
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div className='flex items-center gap-3'>
                        <input
                           type='checkbox'
                           id='vaccinated'
                           checked={petForm.vaccinated}
                           onChange={(e) => setPetForm({ ...petForm, vaccinated: e.target.checked })}
                           className='w-5 h-5 text-focinhando-accent'
                        />
                        <label htmlFor='vaccinated' className='font-semibold text-focinhando-dark'>
                           Vacinado
                        </label>
                     </div>

                     <div className='md:col-span-2'>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Sobre o Pet</label>
                        <textarea
                           value={petForm.about}
                           onChange={(e) => setPetForm({ ...petForm, about: e.target.value })}
                           required
                           rows={4}
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition resize-none'
                        />
                     </div>

                     <div className='md:col-span-2'>
                        <button
                           type='submit'
                           disabled={loading}
                           className={`w-full p-4 rounded-xl font-bold text-white text-lg transition ${loading
                                 ? 'bg-gray-400 cursor-not-allowed'
                                 : submitStatus === 'success'
                                    ? 'bg-green-500'
                                    : submitStatus === 'error'
                                       ? 'bg-red-500'
                                       : 'bg-focinhando-accent hover:bg-focinhando-accent-dark'
                              }`}
                        >
                           {loading
                              ? 'Cadastrando...'
                              : submitStatus === 'success'
                                 ? 'Pet Cadastrado! ✓'
                                 : submitStatus === 'error'
                                    ? 'Erro ao cadastrar'
                                    : 'Cadastrar Pet'}
                        </button>
                     </div>
                  </form>
               </div>
            )}

            {/* Publications Tab */}
            {activeTab === 'publications' && (
               <div className='bg-white rounded-3xl p-8 shadow-lg'>
                  <h2 className='text-3xl font-bold mb-6 text-focinhando-dark'>Nova Publicação</h2>

                  <form onSubmit={handlePublicationSubmit} className='space-y-6'>
                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Título</label>
                        <input
                           type='text'
                           value={publicationForm.title}
                           onChange={(e) => setPublicationForm({ ...publicationForm, title: e.target.value })}
                           required
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Tópico/Categoria</label>
                        <input
                           type='text'
                           value={publicationForm.topic}
                           onChange={(e) => setPublicationForm({ ...publicationForm, topic: e.target.value })}
                           required
                           placeholder='Ex: Adoção, Dicas, Saúde'
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Imagem (nome do arquivo)</label>
                        <input
                           type='text'
                           value={publicationForm.img}
                           onChange={(e) => setPublicationForm({ ...publicationForm, img: e.target.value })}
                           required
                           placeholder='blog.jpg'
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                        />
                     </div>

                     <div>
                        <label className='block mb-2 font-semibold text-focinhando-dark'>Texto da Publicação</label>
                        <textarea
                           value={publicationForm.text}
                           onChange={(e) => setPublicationForm({ ...publicationForm, text: e.target.value })}
                           required
                           rows={12}
                           placeholder='Use \n para quebras de linha...'
                           className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition resize-none font-mono text-sm'
                        />
                     </div>

                     <button
                        type='submit'
                        disabled={loading}
                        className={`w-full p-4 rounded-xl font-bold text-white text-lg transition ${loading
                              ? 'bg-gray-400 cursor-not-allowed'
                              : submitStatus === 'success'
                                 ? 'bg-green-500'
                                 : submitStatus === 'error'
                                    ? 'bg-red-500'
                                    : 'bg-focinhando-accent hover:bg-focinhando-accent-dark'
                           }`}
                     >
                        {loading
                           ? 'Publicando...'
                           : submitStatus === 'success'
                              ? 'Publicação Criada! ✓'
                              : submitStatus === 'error'
                                 ? 'Erro ao publicar'
                                 : 'Publicar'}
                     </button>
                  </form>
               </div>
            )}
         </div>
      </div>
   )
}

export default Admin
