package org.unical.webapp.backend.service;

import org.unical.webapp.backend.model.Commento;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;

import java.util.Collection;

public interface ContenutoServiceInterface {

    Collection<Commento> getCommenti(Contenuto contenuto);
    Contenuto getById(int id, boolean type);
    Collection<Contenuto> getByUtente(String username);

    void aggiornaStatusContenuto(String utente, int contenutoID, boolean isSerie, int status);
    void aggiornaVisualizzazione(String utente, int contenutoID, int stagione, int episodio);
    void deleteContenuto(int id, boolean isSerie, String username);
    void modificaVoto(String utente, boolean type, int idContenuto, int rating);
}
