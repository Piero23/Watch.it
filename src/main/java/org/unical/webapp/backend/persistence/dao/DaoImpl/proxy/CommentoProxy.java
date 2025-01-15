package org.unical.webapp.backend.persistence.dao.DaoImpl.proxy;

import org.unical.webapp.backend.model.Commento;
import org.unical.webapp.backend.persistence.DBManager;

import java.util.List;

public class CommentoProxy extends Commento {

    public CommentoProxy(int id_commento, int id_contenuto_api, boolean is_serie, String contenuto, int voto, String username_utente, int commento_risposto, List<Commento> risposte) {
        super(id_commento, id_contenuto_api, is_serie, contenuto, voto, username_utente, commento_risposto, risposte);
    }

    public CommentoProxy() {
    }

    public List<Commento> getRisposte() {
        if (risposte == null) {
            risposte=DBManager.getInstance().getCommentoDao().findResponses(this);
        }
        return risposte;
    }

}
