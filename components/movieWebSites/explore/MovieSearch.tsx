import React from 'react'

const MovieSearch = () => {
    return (
        <>
            <form>
                <div>
                    <div>
                        <label htmlFor="year">search year</label>
                        <select id="year">
                            <option value="2021">2021</option>
                            <option value="2021">2022</option>
                        </select>
                    </div>
                </div>
            </form>
        </>
    )
}

export default MovieSearch