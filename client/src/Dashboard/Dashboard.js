import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { FaUsers, FaCar, FaMoneyBillAlt } from 'react-icons/fa';
import { MdLaptopMac } from 'react-icons/md';
import Chart from 'react-google-charts';
import avatar from './avatar.png';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState('');
  const [trips, setTrips] = useState([]);
  const [driver, setDriver] = useState([]);

  useEffect(() => {
    axios.get('/api/stats').then(({ data }) => {
      setStats(data.data);
    });

    axios
      .get('/api/trips')
      .then(({ data }) => {
        setTrips(data.data);
        return data.data;
      })
      .then(async trips => {
        let drivers = trips.map(trip => {
          return axios
            .get(`api/driver/${trip.driverID}`)
            .then(({ data }) => data.data.name)
            .catch(err => console.log(err.message));
        });
        let newDrivers = await Promise.all(drivers);
        setDriver(newDrivers);
      });
  }, []);

  function handleClick(e) {
    e.preventDefault();
    const found = trips.filter(el => e.target.id === el.tripID);
    console.log(found);
  }

  return (
    <div className="dashboard-view">
      <div className="aside-view">
        <h3>
          <MdLaptopMac /> Dashboard
        </h3>
        <img src={avatar} alt="avatar" className="avatar" />
        <h2> Welcome Admin </h2>
        <div className="views">
          <p>
            <FaUsers /> Total Users : {stats.male + stats.female}{' '}
          </p>
        </div>
        <div className="views">
          <p>
            <FaCar /> Total Trips :{' '}
            {stats.noOfCashTrips + stats.noOfNonCashTrips}{' '}
          </p>
        </div>
        <div className="views">
          <p>
            <FaMoneyBillAlt /> Total Earnings : ${stats.billedTotal}
          </p>
        </div>
      </div>

      <div className="main-view">
        <div className="charts">
          <div className="chart-1">
            <Chart
              width={'400px'}
              height={'270px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Gender', 'Number Of Users'],
                ['Male', stats.male],
                ['Female', stats.female],
              ]}
              options={{
                title: 'Total Users: Gender',
                is3D: true,
                // pieHole: 0.3,
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>

          <div className="chart-2">
            <Chart
              width={'400px'}
              height={'350px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Trips', 'Number Of Earnings'],
                ['Cash Earnings', stats.noOfCashTrips],
                ['Card Earnings', stats.noOfNonCashTrips],
              ]}
              options={{
                title: 'Total Earnings: Cash / Card',
                is3D: true,
              }}
              rootProps={{ 'data-testid': '2' }}
            />
          </div>
        </div>

        <div className="bar">
          <Chart
            width={'700px'}
            height={'350px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Earnings', 'Payment type'],
              ['Total Billed', stats.billedTotal],
              ['Total Cash Earnings', stats.cashBilledTotal],
              ['Total Card Earnings', stats.nonCashBilledTotal],
            ]}
            options={{
              title: 'Earnings Chart',
              chartArea: { width: '50%' },
              hAxis: {
                title: 'Total Earnings',
                minValue: 0,
              },
              vAxis: {
                title: 'Total Earnings',
              },
            }}
            rootProps={{ 'data-testid': '3' }}
          />
        </div>
        <div className="tripsTable">
          <table className="fixed_header">
            <thead>
              <tr>
                <th>Info</th>
                <th>Driver Name</th>
                <th>User</th>
                <th>Billed Amount</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, index) => (
                <tr key={trip.tripID}>
                  <td
                    onClick={handleClick}
                    id={trip.tripID}
                    to={`/trip/${trip.tripID}`}
                  >
                    {' '}
                    <NavLink to={`/trip/${trip.tripID}`} id={trip.tripID}>
                      <span>i</span>
                    </NavLink>
                  </td>

                  <td>{driver[index] ? driver[index] : 'No name'}</td>
                  <td>{trip.user.name}</td>
                  <td>${trip.billedAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
