import React, {useState, FormEvent} from 'react'

import './styles.css'
import { PageHeader, TeacherItem, Input, Select } from '../../components'
import { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'

function TeachersList(){
  const [teachers, setTeachers] = useState([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time,setTime] = useState('')

  async function searchTeachers(e: FormEvent){
    e.preventDefault()
    
    const response = await api.get('classes',{
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            label="Dia da semana"
            name="week_day"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sabádo' }
            ]}
          />
          <Select
            label="Matéria" 
            name="subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}

            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Química', label: 'Química' },
              { value: 'Português', label: 'Português' }
            ]}
          />
          <Input
            type="time"
            label="Hora"
            name="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <button type="submit">Buscar</button>       
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => 
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
          />
        )}
      </main>
    </div>
  )
}

export default TeachersList
