import React from 'react'
import { useParams } from 'react-router-dom'

function menu_home() {
    const { title } = useParams();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">หน้าแรกของ: {title}</h1>
            {/* ทำอะไรกับ manga.title ได้เลย เช่นโหลด ep, แสดงภาพ ฯลฯ */}
        </div>
    )
}

export default menu_home