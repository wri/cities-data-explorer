'use client'

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { MapContext } from '../../Base';
import File from './File';


export function Browser() {
    const ctx = useContext(MapContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function handler() {
            let res = await axios.get("https://api.airtable.com/v0/appjVjIaI67kNB77c/tblkSKAqzrojBPAJT", {
                headers: {
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`
                }
            });
            setData(res.data.records)
        }
        handler()
    }, [])


    return (<div className='text-black flex flex-col px-4 gap-4 pt-2'>
        {data.map((f, i) => {
            return <File file={f} key={f.id} />

        })}

    </div>
    );

}