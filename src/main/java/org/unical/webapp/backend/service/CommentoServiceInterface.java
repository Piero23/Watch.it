package org.unical.webapp.backend.service;

import org.unical.webapp.backend.model.Commento;

public interface CommentoServiceInterface {

    Commento getCommentoById(int id);
    void setAnswer(Commento question, Commento answer);

    void saveCommento(Commento commento);
}
