import { useState, useEffect, useCallback } from 'react'
import { FaEdit, FaTrash, FaCalendarAlt, FaSpinner, FaTimes, FaUpload } from 'react-icons/fa'

interface Publication {
   id: string
   title: string
   topic: string
   img: string
   text: string
   createdAt: string
}

interface PublicationsManagementProps {
   apiBaseUrl: string
}

const PublicationsManagement = ({ apiBaseUrl }: PublicationsManagementProps) => {
   const [publications, setPublications] = useState<Publication[]>([])
   const [loading, setLoading] = useState(true)
   const [deletingId, setDeletingId] = useState<string | null>(null)
   const [editingPublication, setEditingPublication] = useState<Publication | null>(null)
   const [saving, setSaving] = useState(false)
   const [selectedFile, setSelectedFile] = useState<File | null>(null)
   const [uploading, setUploading] = useState(false)
   // Cloudinary config (use env vars se possível)
   const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
   const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

   const uploadToCloudinary = async (file: File): Promise<string | null> => {
      setUploading(true)
      try {
         const formData = new FormData()
         formData.append('file', file)
         formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
         const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
               method: 'POST',
               body: formData
            }
         )
         const data = await response.json()
         if (data.secure_url) {
            return data.secure_url
         } else {
            alert('Erro ao fazer upload da imagem')
            return null
         }
      } catch {
         alert('Erro ao fazer upload da imagem')
         return null
      } finally {
         setUploading(false)
      }
   }

   const loadPublications = useCallback(async () => {
      setLoading(true)
      try {
         const response = await fetch(`${apiBaseUrl}/publication/all-publications`)
         const data = await response.json()

         if (!data.error && data.publications) {
            setPublications(data.publications)
         }
      } catch (error) {
         console.error('Erro ao carregar publicações:', error)
      } finally {
         setLoading(false)
      }
   }, [apiBaseUrl])

   useEffect(() => {
      loadPublications()
   }, [loadPublications])

   const handleDelete = async (publicationId: string) => {
      if (!confirm('Tem certeza que deseja remover esta publicação? Esta ação não pode ser desfeita.')) {
         return
      }

      setDeletingId(publicationId)
      try {
         const token = localStorage.getItem('authToken')
         const response = await fetch(`${apiBaseUrl}/publication/${publicationId}`, {
            method: 'DELETE',
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })

         const data = await response.json()

         if (!data.error) {
            setPublications(publications.filter(pub => pub.id !== publicationId))
         } else {
            alert('Erro ao remover publicação: ' + data.error)
         }
      } catch (error) {
         console.error('Erro ao remover publicação:', error)
         alert('Erro ao conectar com o servidor')
      } finally {
         setDeletingId(null)
      }
   }

   const handleEditClick = (publication: Publication) => {
      setEditingPublication({ ...publication })
   }

   const handleSave = async () => {
      if (!editingPublication) return

      setSaving(true)
      let imageUrl = editingPublication.img
      if (selectedFile) {
         imageUrl = await uploadToCloudinary(selectedFile) || ''
         if (!imageUrl) {
            setSaving(false)
            return
         }
      }
      try {
         const token = localStorage.getItem('authToken')
         const response = await fetch(`${apiBaseUrl}/publication/${editingPublication.id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
               ...editingPublication,
               img: imageUrl
            })
         })

         const data = await response.json()

         if (!data.error) {
            setPublications(publications.map(pub => pub.id === editingPublication.id ? { ...editingPublication, img: imageUrl } : pub))
            setEditingPublication(null)
            setSelectedFile(null)
         } else {
            alert('Erro ao atualizar publicação: ' + data.error)
         }
      } catch (error) {
         console.error('Erro ao atualizar publicação:', error)
         alert('Erro ao conectar com o servidor')
      } finally {
         setSaving(false)
      }
   }

   const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
         day: '2-digit',
         month: 'long',
         year: 'numeric'
      })
   }

   if (loading) {
      return (
         <div className='flex items-center justify-center py-20'>
            <div className='text-center'>
               <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-focinhando-accent mx-auto mb-4'></div>
               <p className='text-gray-600'>Carregando publicações...</p>
            </div>
         </div>
      )
   }

   if (publications.length === 0) {
      return (
         <div className='bg-white rounded-xl border border-gray-200 p-12 text-center'>
            <FaEdit className='text-6xl text-gray-300 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>Nenhuma publicação cadastrada</h3>
            <p className='text-gray-600'>As publicações cadastradas aparecerão aqui</p>
         </div>
      )
   }

   return (
      <div className='space-y-4'>
         <div className='flex items-center justify-between mb-6'>
            <div>
               <h2 className='text-2xl font-bold text-gray-900'>Publicações Cadastradas</h2>
               <p className='text-gray-600 mt-1'>{publications.length} {publications.length === 1 ? 'publicação' : 'publicações'} no blog</p>
            </div>
         </div>

         <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
            {publications.map((publication) => (
               <div key={publication.id} className='bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow'>
                  {/* Publication Image */}
                  <div className='relative h-48 bg-gray-100'>
                     <img
                        src={publication.img}
                        alt={publication.title}
                        className='w-full h-full object-cover'
                        onError={(e) => {
                           e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Sem+Imagem'
                        }}
                     />
                     <div className='absolute top-3 left-3'>
                        <span className='bg-focinhando-accent text-white px-3 py-1 rounded-full text-xs font-semibold'>
                           {publication.topic}
                        </span>
                     </div>
                  </div>

                  {/* Publication Info */}
                  <div className='p-5'>
                     <h3 className='text-xl font-bold text-gray-900 mb-2 line-clamp-2'>
                        {publication.title}
                     </h3>

                     <div className='flex items-center gap-2 text-sm text-gray-600 mb-3'>
                        <FaCalendarAlt className='text-focinhando-accent' />
                        <span>{formatDate(publication.createdAt)}</span>
                     </div>

                     <p className='text-sm text-gray-600 mb-4 line-clamp-3'>
                        {publication.text}
                     </p>

                     {/* Action Buttons */}
                     <div className='flex gap-2'>
                        <button
                           onClick={() => handleEditClick(publication)}
                           className='flex-1 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2'
                        >
                           <FaEdit />
                           Editar
                        </button>
                        <button
                           onClick={() => handleDelete(publication.id)}
                           disabled={deletingId === publication.id}
                           className='flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        >
                           {deletingId === publication.id ? (
                              <>
                                 <FaSpinner className='animate-spin' />
                                 Removendo...
                              </>
                           ) : (
                              <>
                                 <FaTrash />
                                 Remover
                              </>
                           )}
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Edit Modal */}
         {editingPublication && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
               <div className='bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto'>
                  <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
                     <h2 className='text-2xl font-bold text-gray-900'>Editar Publicação</h2>
                     <button
                        onClick={() => setEditingPublication(null)}
                        className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                     >
                        <FaTimes className='text-xl text-gray-600' />
                     </button>
                  </div>

                  <div className='p-6'>
                     <div className='space-y-4'>
                        {/* Título */}
                        <div>
                           <label className='block text-sm font-semibold text-gray-700 mb-2'>Título *</label>
                           <input
                              type='text'
                              value={editingPublication.title}
                              onChange={(e) => setEditingPublication({ ...editingPublication, title: e.target.value })}
                              className='w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none'
                           />
                        </div>

                        {/* Tópico */}
                        <div>
                           <label className='block text-sm font-semibold text-gray-700 mb-2'>Tópico *</label>
                           <input
                              type='text'
                              value={editingPublication.topic}
                              onChange={(e) => setEditingPublication({ ...editingPublication, topic: e.target.value })}
                              placeholder='Ex: Cuidados, Adoção, Saúde...'
                              className='w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none'
                           />
                        </div>

                        {/* Imagem Upload */}
                        <div>
                           <label className='block text-sm font-semibold text-gray-700 mb-2'>Imagem *</label>
                           <label className='w-full cursor-pointer'>
                              <div className={`w-full px-4 py-2.5 rounded-lg border-2 transition flex items-center justify-center gap-2 ${uploading
                                 ? 'border-focinhando-accent bg-focinhando-accent/5 cursor-wait'
                                 : 'border-gray-200 bg-gray-50 hover:border-focinhando-accent hover:bg-gray-100'
                                 }`}>
                                 {uploading ? (
                                    <span className='text-focinhando-accent font-semibold'>Enviando imagem...</span>
                                 ) : (
                                    <span className='text-gray-700 flex items-center gap-2'>
                                       <FaUpload />
                                       {selectedFile ? selectedFile.name : 'Escolher arquivo'}
                                    </span>
                                 )}
                              </div>
                              <input
                                 type='file'
                                 accept='image/*'
                                 onChange={e => {
                                    const file = e.target.files?.[0]
                                    if (file) setSelectedFile(file)
                                 }}
                                 disabled={uploading}
                                 className='hidden'
                              />
                           </label>

                           {/* Preview da imagem */}
                           {(selectedFile || editingPublication.img) && (
                              <div className='mt-3 flex items-center gap-3'>
                                 <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-focinhando-accent/20'>
                                    <img
                                       src={selectedFile ? URL.createObjectURL(selectedFile) : editingPublication.img}
                                       alt='Preview'
                                       className='w-full h-full object-cover'
                                    />
                                 </div>
                                 <span className='text-xs text-gray-600'>Preview da imagem</span>
                              </div>
                           )}
                        </div>

                        {/* Texto */}
                        <div>
                           <label className='block text-sm font-semibold text-gray-700 mb-2'>Texto da Publicação *</label>
                           <textarea
                              value={editingPublication.text}
                              onChange={(e) => setEditingPublication({ ...editingPublication, text: e.target.value })}
                              rows={8}
                              className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none resize-none'
                           />
                        </div>
                     </div>

                     {/* Buttons */}
                     <div className='flex gap-3 mt-6'>
                        <button
                           onClick={() => setEditingPublication(null)}
                           className='flex-1 px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors'
                        >
                           Cancelar
                        </button>
                        <button
                           onClick={handleSave}
                           disabled={saving}
                           className='flex-1 px-6 py-3 rounded-lg font-semibold bg-focinhando-accent text-white hover:bg-focinhando-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        >
                           {saving ? (
                              <>
                                 <FaSpinner className='animate-spin' />
                                 Salvando...
                              </>
                           ) : (
                              'Salvar Alterações'
                           )}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default PublicationsManagement
