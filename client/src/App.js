import React from "react";
import { Routes, Route } from 'react-router-dom'
import Index from './components/Index'

export default function App () {
    return (
    <>
		<main>
			<Routes>
				<Route path="/" element={<Index/>}></Route>
			</Routes>
		</main>
    </>
    )
}