import React from 'react'
import { useEffect } from 'react'
import TryAgain from 'comps/TryAgain'
import Spinner from 'comps/Spinner'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { getTrends, trendsSelectors } from './trendsSlice'

export default (props) => {
    let dispatch = useDispatch()
    let { status } = useSelector(state => state.trends)
    let trendObj = useSelector(state => trendsSelectors.selectById(state, 1))
    if (trendObj)
        var { locations: [location], trends } = trendObj
    else
        trends = null
    useEffect(() => {
        if (status === 'idle')
            dispatch(getTrends())
        // eslint-disable-next-line
    }, [])
    if (status === 'loading')
        return <Spinner />
    else if (status === 'error')
        return <TryAgain fn={() => { dispatch(getTrends) }} />
    if (!trends || !trends.length)
        return <div className="message">No Trends for you RN</div>
    return (
        <ListGroup variant="flush">
            {(trends && trends.slice(0, props.length).map(itm => {
                return (
                    <ListGroup.Item
                        as={Link}
                        action
                        key={itm.name}
                        to={`/search?q=${itm.query}`}
                    >
                        <small className="text-muted">Tending {location.name}</small>
                        <p className="mb-1 text-dark font-weight-bold text-capitalize">{itm.name}</p>
                        <em className="">{itm.tweet_volume + ' Tweets'} </em>
                    </ListGroup.Item>
                )
            }))}
        </ListGroup>
    )
}