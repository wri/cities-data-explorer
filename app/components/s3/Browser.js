'use client'

import { useEffect, useState } from 'react';
import File from './File';
import Folder from './Folder';
import ListObjects from './ListObjects';



export default function Browser() {
  const [prefix, setPrefix] = useState("")
  const [prev, setPrev] = useState(null)
  const [folders, setFolders] = useState([])
  const [files, setFiles] = useState([])
  useEffect(() => {
    async function handler() {
      let data = await ListObjects(prefix);
      const fi = data.objects.filter(f => f.path != prefix)
      setFiles(fi)
      setFolders(data.folders)
    }
    handler()
  }, [prefix])

  return (<div className='text-black flex flex-col px-4 gap-4 pt-2'>
    {prefix !== "" && <span className='hover:cursor-pointer' onClick={() => {
      setPrev(prev => {
        setPrefix(prev)
        let prevPath = prev?.split("/").slice(0, -2).join("/")
        return (prevPath.length > 0 ? prevPath : "")
      })
    }}>...</span>}
    {folders.map((f, i) => {
      return <Folder folder={f} key={i} setPrefix={setPrefix} setPrev={setPrev} />
    })}
    {files.map((f, i) => {
      return <File file={f} key={i} />

    })}

  </div>
  );
}
