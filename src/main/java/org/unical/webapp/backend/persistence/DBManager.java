package org.unical.webapp.backend.persistence;

import org.unical.webapp.backend.persistence.dao.CommentoDao;
import org.unical.webapp.backend.persistence.dao.ContenutoDao;
import org.unical.webapp.backend.persistence.dao.DaoImpl.ConcreteCommentoDao;
import org.unical.webapp.backend.persistence.dao.DaoImpl.ConcreteContenutoDao;
import org.unical.webapp.backend.persistence.dao.DaoImpl.ConcreteUtenteDao;
import org.unical.webapp.backend.persistence.dao.UtenteDao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBManager {
    private static DBManager instance = null;

    private DBManager(){}
    private UtenteDao utenteDao = null;
    private CommentoDao commentoDao = null;
    private ContenutoDao contenutoDao = null;

    public static DBManager getInstance(){
        if (instance == null){
            instance = new DBManager();
        }
        return instance;
    }

    Connection con = null;

    public Connection getConnection(){
        if (con == null){
            try {
                con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/WatchedIt", "postgres", "password");
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return con;
    }

    public CommentoDao getCommentoDao(){
        if (commentoDao == null){
          commentoDao = new ConcreteCommentoDao();
        }
        return commentoDao;
    }

  public ContenutoDao getContenutoDao() {
      if (contenutoDao == null){
        contenutoDao = new ConcreteContenutoDao();
      }
      return contenutoDao;
  }

  public UtenteDao getUtenteDao() {
      if (utenteDao == null){
        utenteDao = new ConcreteUtenteDao();
      }
      return utenteDao;
  }
}
