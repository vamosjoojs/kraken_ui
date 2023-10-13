import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { Container, Table, Card, Button, Spinner } from "react-bootstrap";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './schedules.css'
import { axiosInstance } from '../../api';
import { Endpoints } from '../../api/endpoints';
import { PostStatus, removeHours } from '../../utils/transformers';

const localizer = momentLocalizer(moment)


export default function Schedules() {
    const [myEvents, setEvents] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axiosInstance.get(Endpoints.kraken.getQueue(1, 9999))
            .then(res => {
                const lis = res.data.items.map(item => {
                    {
                        let end_date = new Date(removeHours(3, new Date(item.schedule)))
                        let start_date = new Date(removeHours(3, new Date(item.schedule)))
                        let post_status = PostStatus(item.post_status)
                        end_date.setHours(end_date.getHours() + 0.5)
                        return (
                            {
                                title: item.name,
                                start: start_date,
                                end: end_date,
                                status: post_status
                            }
                        )
                    }
                })
                setEvents(lis)
                setIsLoading(false)
            })
    }, [])

    const handleSelectEvent = useCallback(
        (event) => window.alert(`Status de postagem: ${event.status}`),
        []
    )

    return (
        <Container>
            <Card className="myCustomHeight">
                {isLoading === true ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : <Calendar
                    defaultView={Views.MONTH}
                    showMultiDayTimes
                    events={myEvents}
                    localizer={localizer}
                    onSelectEvent={handleSelectEvent}
                />}

            </Card>
        </Container>
    )
}


