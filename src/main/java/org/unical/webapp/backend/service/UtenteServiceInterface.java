package org.unical.webapp.backend.service;

import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;

import java.sql.Blob;
import java.util.Collection;

public interface UtenteServiceInterface {

    Collection<Utente> getAll();
    Utente getByUsername(String username);
    void newUtente(Utente utente);
    void deleteUtente(Utente utente);
    void newBgImage(Utente utente, Blob image);
    void newProPic(Utente utente, Blob image);

    Collection<Contenuto> getContenutiByUtente(Utente utente);

}
