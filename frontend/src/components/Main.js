import React from 'react';
import Card from '../../posts-microfrontend/src/components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {ProfileSectionEntrypoint} from "../../profile-microfrontend/src/entrypoints/ProfileSection.entrypoint";
import {PlacesSectionEntrypoint} from "../../posts-microfrontend/src/entrypoints/PlacesSection.entrypoint";

function Main({ closeAllPopups }) {
  return (
    <main className="content">
      <ProfileSectionEntrypoint />
      <PlacesSectionEntrypoint closeAllPopups={closeAllPopups} />
    </main>
  );
}

export default Main;
