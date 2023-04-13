import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import { useSession } from "next-auth/react";
import mapStyling from "../../util/mapStyling.json";
import marker from "../../../public/marker.png";
import { useLazyQuery, useQuery } from "@apollo/client";
import { SearchUsersData, SearchUsersInput } from "@/src/util/types";
import UserOperations from "../../graphql/operations/user";
import { Session } from "next-auth";
import { IoChatbubbles, IoSettingsSharp } from "react-icons/io5";

// Google Maps API Key
//AIzaSyA2MWAP5Vpv4-XbjsWZ7aT3tE_-Fpb71y4

function MapWrapper() {
  const { data: session, status } = useSession();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA2MWAP5Vpv4-XbjsWZ7aT3tE_-Fpb71y4",
  });
  const [searchUsers, { data: users, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  useEffect(() => {
    if (session?.user.latitude && session?.user.longitude) {
      searchUsers({ variables: { username: "" } });
    }
  }, [session?.user.latitude, session?.user.longitude, session]);
  return (
    <div className="flex items-center justify-center relative">
      {isLoaded ? (
        <Map
          lat={session?.user.latitude}
          lng={session?.user.longitude}
          users={users?.searchUsers}
          session={session}
          className="flex-1"
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

const Map: React.FC<IMapProps> = ({ lat, lng, users, session, className }) => {
  const center = { lat: parseFloat(lat), lng: parseFloat(lng) };
  const createConversation = (id: string) => {
    //console.log(id);
  };
  const [selected, setSelected] = React.useState<any>(null);
  return (
    <div className={className}>
      {lat && lng && (
        <GoogleMap
          mapContainerStyle={{ height: "100vh", width: "80vw" }}
          zoom={14}
          center={center}
          options={{
            styles: mapStyling,
            disableDefaultUI: true,
            zoomControl: false,
            backgroundColor: "black",
            keyboardShortcuts: false,
          }}
        >
          <CircleF
            center={center}
            radius={5000}
            options={{
              strokeColor: "#6AC46D",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#6AC46D",
              fillOpacity: 0.35,
            }}
          />
          {window &&
            users?.map((user: any) => {
              //onsole.log("image", user);
              return (
                <MarkerF
                  key={user.id}
                  position={{
                    lat: parseFloat(user.latitude),
                    lng: parseFloat(user.longitude),
                  }}
                  onClick={() => createConversation(user.id)}
                  options={{
                    icon: {
                      url: user.imageUrl ? user.imageUrl : "marker.png",
                      scaledSize: new window.google.maps.Size(50, 50),
                      origin: new window.google.maps.Point(0, 0),
                    },
                    label: {
                      text: user.username,
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                    },
                  }}
                />
              );
            })}
          <MarkerF
            position={center}
            options={{
              icon: {
                url: session?.user.imageUrl
                  ? session?.user.imageUrl
                  : "marker.png",
                scaledSize: new window.google.maps.Size(70, 70),
                origin: new window.google.maps.Point(0, 0),
              },
            }}
          />
        </GoogleMap>
      )}
      <div className="absolute top-0 left-0 flex flex-col items-center justify-end w-1/4 h-full invisible p-3">
        <div className="flex items-center justify-center w-full h-1/3 z-10 visible bg-primary bordered rounded-3xl">
          {selected ? <div></div> : <h1>click on a user</h1>}
        </div>
      </div>
    </div>
  );
};

interface IMapProps {
  lat: any;
  lng: any;
  users: any;
  session: Session | null | undefined;
  className?: string;
}

export default MapWrapper;
