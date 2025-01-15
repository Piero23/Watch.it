package org.unical.webapp.backend.persistence.dao.DaoImpl.proxy;

import org.unical.webapp.backend.model.Commento;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.persistence.DBManager;

import java.util.ArrayList;
import java.util.List;

public class ContenutoProxy extends Contenuto {

    public ContenutoProxy() {
    }

    public ContenutoProxy(int id_contenuto, boolean is_serie, String utente, int stagione, int episodio, int status, int rating, List<Commento> commenti) {
        super(id_contenuto, is_serie, utente, stagione, episodio, status, rating, commenti);
    }

    public List<Commento> getCommenti() {
        if (commenti == null){
            commenti = DBManager.getInstance().getCommentoDao().findByContent(this.id_contenuto, this.is_serie);
        }
        return commenti;
    }
}
