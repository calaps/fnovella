package org.fnovella.project.utility.model;

import java.util.List;

public class APIResponse {

	private Object data;
	private List<String> errors;
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public List<String> getErrors() {
		return errors;
	}
	public void setErrors(List<String> errors) {
		this.errors = errors;
	}
	public APIResponse(Object data, List<String> errors) {
		super();
		this.data = data;
		this.errors = errors;
	}
	public APIResponse() {
		super();
	}
	
}