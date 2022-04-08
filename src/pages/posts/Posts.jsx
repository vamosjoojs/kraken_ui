import React, { useEffect, useState } from "react";
import { Container, Table, Card, Button } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import { CustomPagination } from "../../components/customPagination/customPagination";
import { dateAdjust, krakenHand, PostStatus } from "../../utils/transformers";
import "./Post.css"

export default function Posts() {
    const [queue, setQueue] = useState([]);
    const [updateTable, setUpdateTable] = useState(false);
    const [pageNumber, setPageNumber] = React.useState(1);

    const pageChange = event => {
        setPageNumber(event.target.text);
      }
    

    useEffect(() => {
        axiosInstance.get(Endpoints.kraken.getQueue(pageNumber, 15))
            .then(res => {
                setQueue(res.data)
                setUpdateTable(false)
            })
    }, [updateTable, pageNumber])

    const lis = queue.items?.map(item => {
        {
            return (
                <tr>
                    <td className='td1'>{item.name}</td>
                    <td className='td1'>{dateAdjust(item.created_at)}</td>
                    <td className='td1'>{PostStatus(item.post_status)}</td>
                    <td className='td1'>{krakenHand(item.kraken_hand)}</td>
                </tr>
            )
        }
    })

    console.log(queue)

    return (
        <Container className='postPage'>
            <div className="cardPost">
                <Button variant="dark" onClick={() => setUpdateTable(true)}> <i className="fa-solid fa-arrows-rotate"></i></Button>
                <p></p>
                <Table hover className="table" variant="dark">
                    <thead>
                        <tr className='tr'>
                            <th>Clip Nome</th>
                            <th>Data de criação</th>
                            <th>Status da postagem</th>
                            <th>Local de postagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lis}
                    </tbody>
                </Table>
                <CustomPagination currentPage={queue.current_page} totalItems={queue.total_items} totalPages={queue.total_pages} onChange={pageChange}></CustomPagination>
            </div>
        </Container>);
};



