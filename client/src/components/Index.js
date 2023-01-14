import React, { useState } from "react";
import styled from 'styled-components'

const Progress = styled.div`
    width: ${props => props.step}% !important;
`

export default function Index () {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        jobs: '',
        msg: '',
    })

    const [progress, setProgress] = useState(0)
    
    const f_handleInputs = (e) => {
        if (e.value !== ' ') {
            setForm({...form, [e.name]: e.value.trim()})
        }
    }

    const f_handleSelects = (e) => {
        if (e.value !== '') {
            setForm({...form, [e.name]: e.value})
        }
    }

    const isEmailValid = (email) => {
        const emailRegex = new RegExp(
            /^[a-zA-Z0-9.-]+@[a-zA-Z0-9 . -]+\.[a-zA-Z]{2,}$/
        )

        if (emailRegex.test(email)) {
            return true
        }
    }

    const modal = (msg) => {
        openModal(msg)
    }

    const validate = (e) => {
        if (e === null || e === undefined) {
            let isValidate = true

            if (form.name === '') {
                modal(`Por favor preencha o campo Nome`)
                isValidate = false
            }
    
            if (form.msg === '') {
                modal(`Por favor escreva uma mensagem`)
                isValidate = false
            }
    
            if (!isEmailValid(form.email)) {
                modal(`Por favor use um e-mail válido`)
                isValidate = false
            }
    
            if (form.password.length < 8) {
                modal(`Por favor Crie uma senha com pelo menos 8 dígitos`)
                isValidate = false
            }
    
            if (form.jobs === '') {
                modal(`Por favor selecione sua situação de trabalho`)
                isValidate = false
            }

            return isValidate
        } else {
            e = e.target

            if (e.name === 'name' && form.name === '') {
                modal(`Por favor preencha o campo Nome`)
            } else if (e.name === 'name' && form.name !== '') {
                console.log('oie')
                setProgress(progress+20)
            }
    
            if (e.name === 'msg' && form.msg === '') {
                modal(`Por favor escreva uma mensagem`)
            } else if (e.name === 'msg' && form.msg !== '') {
                setProgress(progress+20)
            }
    
            if (e.name === 'email' && !isEmailValid(form.email)) {
                modal(`Por favor use um e-mail válido`)
            } else if (e.name === 'email' && isEmailValid(form.email)) {
                setProgress(progress+20)
            }
    
            if (e.name === 'password' && form.password.length < 8) {
                modal(`Por favor Crie uma Senha com pelo menos 8 dígitos`)
            } else if (e.name === 'password' && form.password.length >= 8) {
                setProgress(progress+20)
            }
    
            if (e.name === 'jobs' && form.jobs === '') {
                modal(`Por favor selecione sua Situação de trabalho`)
            } else if (e.name === 'jobs' && form.jobs !== '') {
                setProgress(progress+20)
            }


            if (progress >= 80) {
                document.querySelector('.progress').id = 'success'
                console.log(document.querySelector('.progress'))
            }
        }
    }

    const sendDatas = () => {
        if (validate()) {
            setTimeout(() => {
                alert('tudo Ok')
                console.log(`Enviando dados...\n ${form}`)
            }, 700)
        }
    }

    const openModal = (msg) => {
        const ctrModal = document.querySelector('.ctr-modal')

        ctrModal.classList.remove('close')
        document.querySelector('.modal p').innerHTML = msg

        document.addEventListener('keydown', (key) => {
            key = key.key
            
            if (key === 'Enter' || key === 'Escape') {
                closeModal()
            }
        })
    }

    const closeModal = () => {
        document.querySelector('.ctr-modal').classList.add('close')
        document.querySelector('.modal button')
    }

    return (
    <div className="form">
        <h1>Form</h1>

        <div className="ctr-modal close">
            <div className="modal">
                <div className="ctr-notice">
                    <h3 className="notice">Aviso:</h3>
                    <p></p>
                </div>

                <button className="close button-small" onClick={() => {closeModal()}}>Fechar</button>
            </div>
        </div>

        <div className="ctr-progressBar">
            <Progress step={progress} id='progress' className="progress"></Progress>
        </div>

        <div className="ctr-inputs">
            <div className="ctr-input">
                <label htmlFor="name">Nome:</label>
                <input 
                    type='text' 
                    id='name' 
                    name='name' 
                    value={form.name}
                    placeholder='Digite seu nome'
                    onBlur={(e) => {validate(e)}}
                    onChange={(e) => {f_handleInputs(e.target)}}
                />
            </div>

            <div className="ctr-input">
                <label htmlFor="email">E-mail:</label>
                <input 
                    type='email' 
                    id='email' 
                    name='email' 
                    value={form.email}
                    placeholder='Digite seu e-mail'
                    onBlur={(e) => {validate(e)}}
                    onChange={(e) => {f_handleInputs(e.target)}}
                 />
            </div>

            <div className="ctr-input">
                <label htmlFor="password">Senha:</label>
                <input 
                    type='password' 
                    id='password' 
                    name='password' 
                    value={form.password}
                    placeholder='Digite sua senha'
                    onBlur={(e) => {validate(e)}}
                    onChange={(e) => {f_handleInputs(e.target)}}
                 />
            </div>

            <div className="ctr-select">
                <label htmlFor="jobs">Situação de trabalho:</label>

                <select 
                    id="jobs" 
                    name="jobs"  
                    onBlur={(e) => {validate(e)}}
                    onChange={(e) => {f_handleSelects(e.target)}}
                >
                    <option value=''>Está buscando trabalho?</option>
                    <option value='yes'>Sim</option>
                    <option value='no'>Não</option>
                </select>
            </div>

            <div className="ctr-input">
                <label htmlFor="msg">Mensagem:</label>
                <textarea 
                    id="msg" 
                    name="msg" 
                    value={form.msg}
                    placeholder='escreva uma mensagem falando sobre suas habilidades...'
                    onBlur={(e) => {validate(e)}}
                    onChange={(e) => (f_handleInputs(e.target))}
                ></textarea>
            </div>
        </div>

        <button onClick={() => {sendDatas()}}>Enviar</button>
    </div>
    )
}