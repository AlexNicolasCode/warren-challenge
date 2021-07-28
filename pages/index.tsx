import Head from 'next/head'
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import styles from '../styles/Home.module.css'

type Transacition = {
  id: string,
  title: string,
  description: string,
  status: string,
  amount: number,
  date: string,
  from: string,
  to: string
}

export default function Home() {
  const defaultTransction = {
    "id": "",
    "title": "",
    "description": "",
    "status": "",
    "amount": 0,
    "date": "",
    "from": "",
    "to": ""
  }
  const [allTransaction, setAllTransctions] = useState<Transacition[]>([defaultTransction])
  const [nameFilter, setNameFilter] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<String>("all")
  const [transctions, setTransctions] = useState<Transacition[]>([defaultTransction])
  const [datailsWindow, setDetailsWindow] = useState<boolean>(false)
  const [transctionOpen, setTransctionOpen] = useState<Transacition>(defaultTransction)

  useEffect(() => {
    api.get('/')
      .then((res) => {
        const data =  res.data;
        setTransctions(data);
        setAllTransctions(data);
      });
  }, [])
  
  useEffect(() => {
    const getItensFilted = () => {
      let transctionsFilted;
      transctionsFilted = 
        nameFilter.length < 2
        ? allTransaction 
        : allTransaction.filter((el) => {
            const title = el.title.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
            const titleInput = nameFilter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()

            const status = el.status.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
            const statusInput = statusFilter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()

            const statusCheck = statusFilter == "all" 
              ? title.startsWith(titleInput) 
              : status == statusInput && title.startsWith(titleInput);
            console.log(el.title)
            console.log(nameFilter)
            return statusCheck
          });
    
      setTransctions(transctionsFilted)
    }

    getItensFilted()
  }, [nameFilter])
    
  useEffect(() => {
    const getItensFilted = () => {
      let transctionsFilted;
      transctionsFilted = 
        statusFilter == "all" 
        ? allTransaction.filter((el) => {
            const title = el.title.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
            const titleInput = nameFilter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()

            const titleCheck = titleInput.length < 2
              ? allTransaction
              : title.startsWith(titleInput);
            return titleCheck
          })
        : allTransaction.filter((el) => {
            const title = el.title.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
            const titleInput = nameFilter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()

            const status = el.status.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
            const statusInput = statusFilter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()

            const titleCheck = titleInput.length < 2
              ? status == statusInput
              : status == statusInput && title.startsWith(titleInput);
            console.log(el.title)
            console.log(nameFilter)
            return titleCheck
          });

      setTransctions(transctionsFilted)
    }

    getItensFilted()
  }, [statusFilter])

  const showDetails = async (id: string) => {
    await api.get(`/${id}`)
      .then((res) => setTransctionOpen(res.data));
    setDetailsWindow(true)
  }

  const closeTransactionOpen = () => {
    setDetailsWindow(false)
    setTransctionOpen(defaultTransction)
  }

  const statusTrasanctionOpen: any = {
    "created": "0%",
    "processing": "50%",
    "processed": "100%"
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Warren Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {datailsWindow && 
        <section>
          <button 
            className={styles.closeWindowButton} 
            onClick={closeTransactionOpen}
          >
            X
          </button>

          <div className={styles.processBar}>
            <span 
              style={{ 
                backgroundColor: "#020202",  
                width: `${statusTrasanctionOpen[transctionOpen.status]}` 
              }} />
          </div>
          
          <tr>
            <th>Created</th>
            <th>Processing</th>
            <th>Processed</th>
          </tr>

          <tr>
            <th>ID</th>
            <th>title</th> 
            <th>Description</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
          </tr>          
          setSearchByStatus
          <tr>
            <td>{transctionOpen.id}</td>
            <td>{transctionOpen.title}</td> 
            <td>{transctionOpen.description}</td>
            <td>{transctionOpen.status}</td>
            <td>{transctionOpen.amount}</td>
            <td>{transctionOpen.date}</td>
            <td>{transctionOpen.from}</td>
            <td>{transctionOpen.to}</td>
          </tr>
        </section>
      }

      <main className={styles.main}>
        <section>
          <input 
            type="text" 
            onChange={(event) => setNameFilter(event.target.value)} value={nameFilter}
          />

          <select onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="processing">Processing</option>
            <option value="processed">Processed</option>
          </select>
        </section>

        <table>
          <tr>
            <th>ID</th>
            <th>title</th> 
            <th>Description</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
          </tr>

            {transctions.map((props: Transacition) => {
              return (
                <tr key={props.id} onClick={() => showDetails(props.id)}>
                  <td>{props.id}</td>
                  <td>{props.title}</td> 
                  <td>{props.description}</td>
                  <td>{props.status}</td>
                  <td>{props.amount}</td>
                  <td>{props.date}</td>
                  <td>{props.from}</td>
                  <td>{props.to}</td>
                </tr>         
              )
            })}
        </table>
      </main>
    </div>
  )
}
