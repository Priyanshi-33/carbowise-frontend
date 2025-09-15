import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReduceFootprint = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Reduce Your Carbon Footprint
      </h1>

      {/* Energy Usage Section */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Use energy-efficient appliances.</li>
            <li>Switch to LED lighting.</li>
            <li>Turn off devices when not in use.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Transportation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Transportation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Walk or cycle for short distances.</li>
            <li>Carpool or use public transport.</li>
            <li>Consider electric or hybrid vehicles.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Food Choices Section */}
      <Card>
        <CardHeader>
          <CardTitle>Food Choices</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Reduce meat and dairy consumption.</li>
            <li>Support local and seasonal produce.</li>
            <li>Avoid food waste.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Waste Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Waste Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Recycle and compost waste.</li>
            <li>Avoid single-use plastics.</li>
            <li>Reuse and repair items.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Water Conservation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Water Conservation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Fix leaking taps.</li>
            <li>Take shorter showers.</li>
            <li>Use water-saving fixtures.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Sustainable Living Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sustainable Living</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Plant trees and maintain greenery.</li>
            <li>Support eco-friendly brands.</li>
            <li>Educate others about climate action.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReduceFootprint;

